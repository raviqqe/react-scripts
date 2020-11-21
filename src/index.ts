import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { build } from "./build";

const subcommand = process.argv[2];

switch (subcommand) {
  case "build":
    await build();
    break;
  default:
    console.error("Usage: react-scripts {build,lint,test}");
    process.exit(1);
}
