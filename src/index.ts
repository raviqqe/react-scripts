import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { build } from "./build";
import { test } from "./test";

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "build":
    await build();
    break;
  case "test":
    await test(args);
    break;
  default:
    console.error("Usage: react-scripts {build,lint,test}");
    process.exit(1);
}
