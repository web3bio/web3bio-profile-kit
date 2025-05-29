import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const external = ["react", "react-dom"];

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
  ],
};
