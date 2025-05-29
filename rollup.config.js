import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const external = ["react", "react-dom"];

const createConfig = (input, output) => ({
  input,
  output: [
    { file: `dist/${output}.js`, format: "esm" },
    { file: `dist/${output}.cjs`, format: "cjs", exports: "named" },
  ],
  external,
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
    }),
    resolve(),
    commonjs(),
  ],
});

const entryPoints = [
  { input: "src/index.ts", output: "index" },
  { input: "src/hooks/index.ts", output: "hooks/index" },
  { input: "src/types/index.ts", output: "types/index" },
  { input: "src/utils/index.ts", output: "utils/index" },
];

export default entryPoints.map(({ input, output }) =>
  createConfig(input, output),
);
