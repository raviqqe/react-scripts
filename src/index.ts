import { build } from "./build";
import { runTests } from "./test";

const [command, ...args] = process.argv.slice(2);

(async (): Promise<void> => {
  switch (command) {
    case "build":
      await build();
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
