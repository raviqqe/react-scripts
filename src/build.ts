import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { rollup } from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import { compilerOptions } from "./compiler-options";

export const build = async (): Promise<void> => {
  await rollup({
    input: "src/index.ts",
    output: {
      dir: "public",
      format: "es",
    },
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
      typescript(compilerOptions),
    ],
  });
};
