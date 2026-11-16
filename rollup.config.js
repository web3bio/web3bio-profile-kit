import { posix as path } from "node:path";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "typescript";

const external = ["react", "react-dom", "@tanstack/react-query"];

const packageDeclarations = {
  name: "package-declarations",
  generateBundle({ format }, bundle) {
    const declarations = Object.values(bundle).filter(
      (asset) => asset.type === "asset" && asset.fileName.endsWith(".d.ts"),
    );
    const declarationNames = new Set(declarations.map((asset) => asset.fileName));
    const isCommonJS = format === "cjs";
    const extension = isCommonJS ? ".cjs" : ".js";

    for (const asset of declarations) {
      const { fileName } = asset;
      let source = String(asset.source);
      const { importedFiles } = ts.preProcessFile(source);
      // Work backwards to keep the offsets in the original source valid.
      for (const { fileName: specifier, pos, end } of importedFiles.reverse()) {
        if (!/^\.\.?\//.test(specifier)) continue;

        const stem = specifier.replace(/\.js$/, "");
        const target = path.join(path.dirname(fileName), stem);
        let modulePath = stem;
        if (!declarationNames.has(`${target}.d.ts`)) {
          if (!declarationNames.has(`${target}/index.d.ts`)) continue;
          modulePath += "/index";
        }
        source = source.slice(0, pos + 1) + modulePath + extension + source.slice(end + 1);
      }

      if (isCommonJS) {
        this.emitFile({
          type: "asset",
          fileName: fileName.replace(/\.d\.ts$/, ".d.cts"),
          source,
        });
        delete bundle[fileName];
      } else {
        asset.source = source;
      }
    }
  },
};

export default {
  input: {
    index: "src/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "types/index": "src/types/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  output: [
    {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].js",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],
  external,
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
      rootDir: "src",
    }),
    resolve(),
    commonjs(),
    packageDeclarations,
  ],
};
