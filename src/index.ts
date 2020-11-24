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
      // eslint-disable-next-line no-console
      console.error("Usage: react-scripts {init,build,watch,lint,test}");
      process.exit(1);
  }
})().catch((error: Error) => {
  /* eslint-disable no-console */
  console.error(error.toString());
  console.error();
  /* eslint-enable no-console */

  process.exit(1);
});
