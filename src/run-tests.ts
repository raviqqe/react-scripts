// eslint-disable-next-line jest/no-jest-import
import { run } from "jest";
import { jestConfiguration } from "./jest-configuration";

export const runTests = async (args: string[]): Promise<void> =>
  run([...args, "--config", JSON.stringify(jestConfiguration)]);
