import { join } from "path";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import * as rollup from "rollup";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import { cp, mkdir } from "shelljs";
import tsConfig from "./tsconfig.json";

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

  const build = await rollup.rollup(getInputOptions(true));

  await build.write(outputOptions);
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
      case "BUNDLE_END":
        console.log(`Bundle generated in ${event.duration} ms`);

        break;
      case "ERROR":
        console.log(event.error.message);

        if (event.error.frame) {
          console.log(event.error.frame);
        }

        break;
    }

    /* eslint-enable no-console */
  });
};
