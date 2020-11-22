import { join } from "path";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { rollup, InputOptions, OutputOptions } from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import { cp, mkdir } from "shelljs";
import tsConfig from "./tsconfig.json";

const publicDirectory = "public";
const buildDirectory = "build";

const inputOptions: InputOptions = {
  input: "src/index.ts",
  plugins: [
    commonjs(),
    json(),
    generateSW({
      globDirectory: buildDirectory,
      swDest: join(buildDirectory, "service-worker.js"),
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
  dir: buildDirectory,
  format: "es",
};

export const build = async (): Promise<void> => {
  mkdir("-p", buildDirectory);
  cp("-r", join(publicDirectory, "*"), buildDirectory);

  const build = await rollup(inputOptions);

  await build.write(outputOptions);
};
