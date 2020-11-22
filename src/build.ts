import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { rollup, InputOptions, OutputOptions } from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import tsConfig from "./tsconfig.json";

const inputOptions: InputOptions = {
  input: "src/index.ts",
  plugins: [
    commonjs(),
    json(),
    generateSW({
      globDirectory: "public",
      swDest: "public/service-worker.js",
    }),
    nodeResolve(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser(),
    typescript(tsConfig.compilerOptions),
  ],
};

const outputOptions: OutputOptions = {
  dir: "public",
  format: "es",
};

export const build = async (): Promise<void> => {
  const build = await rollup(inputOptions);

  await build.write(outputOptions);
};
