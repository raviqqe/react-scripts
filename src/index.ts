import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { rollup } from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import { compilerOptions } from "./compiler-options";

const subcommand = process.argv[2];

switch (subcommand) {
  case "build":
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
    break;
  default:
    console.error("Usage: react-scripts {build,lint,test}");
    process.exit(1);
}
