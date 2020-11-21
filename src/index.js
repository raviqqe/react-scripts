import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import { generateSW } from "rollup-plugin-workbox";
import typescript from "@rollup/plugin-typescript";
const subcommand = process.argv[2];
switch (subcommand) {
    case "build":
        rollup({
            input: "src/index.ts",
            output: {
                dir: "public",
                format: "es",
            },
            plugins: [
                commonjs(),
                json(),
                generateSW({
                    swDest: "public/service-worker.js",
                    globDirectory: "public",
                }),
                nodeResolve(),
                replace({
                    "process.env.NODE_ENV": JSON.stringify("production"),
                }),
                terser(),
                typescript(),
            ],
        });
        break;
    default:
        console.error("Usage: react-scripts {build,lint,test}");
        process.exit(1);
}
