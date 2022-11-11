import * as jest from "jest";
import { jestConfiguration } from "./jest-configuration";

export const runTests = async (args: string[]): Promise<void> =>
  jest.run([...args, "--config", JSON.stringify(jestConfiguration)]);
