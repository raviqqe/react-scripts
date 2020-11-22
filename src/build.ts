import { join, resolve } from "path";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import webpack from "webpack";
import typescript from "@rollup/plugin-typescript";
import * as rollup from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import { cp, mkdir } from "shelljs";
import tsConfig from "./tsconfig.json";
import { promisify } from "util";

const publicDirectory = "public";
const buildDirectory = "build";

const getInputOptions = (noEmitOnError: boolean): rollup.InputOptions => ({
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
    typescript({ ...tsConfig.compilerOptions, noEmitOnError }),
  ],
});

const outputOptions: rollup.OutputOptions = {
  dir: buildDirectory,
  format: "es",
};

const prepareBuildDirectory = () => {
  mkdir("-p", buildDirectory);
  cp("-r", join(publicDirectory, "*"), buildDirectory);
};

export const build = async (): Promise<void> => {
  prepareBuildDirectory();

  const compiler = webpack({
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts"],
    },
    output: {
      filename: "index.js",
      path: resolve("build"),
    },
  });

  const stats = await promisify(compiler.run.bind(compiler))();

  // eslint-disable-next-line no-console
  console.log(stats?.toString());
};

export const watch = (): void => {
  prepareBuildDirectory();

  const watcher = rollup.watch({
    ...getInputOptions(false),
    output: outputOptions,
  });

  watcher.on("event", (event) => {
    /* eslint-disable no-console */

    switch (event.code) {
      case "BUNDLE_START":
        console.log("Generating bundle...");
        console.log();

        break;
      case "BUNDLE_END":
        console.log(`Bundle generated in ${event.duration} ms`);
        console.log();

        break;
      case "ERROR":
        console.log(event.error.message);

        if (event.error.frame) {
          console.log(event.error.frame);
        }

        console.log();

        break;
    }

    /* eslint-enable no-console */
  });
};
