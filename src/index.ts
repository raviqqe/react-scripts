#!/usr/bin/env node

import { build, watch } from "./build";
import { init } from "./init";
import { lint } from "./lint";
import { runTests } from "./run-tests";

const [command, ...args] = process.argv.slice(2);

(async (): Promise<void> => {
  switch (command) {
    case "init":
      await init();
      break;
    case "build":
      await build();
      break;
    case "watch":
      watch();
      break;
    case "lint":
      await lint();
      break;
    case "test":
      await runTests(args);
      break;
    default:
      console.error("Usage: react-scripts {build,lint,test}");
      process.exit(1);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
