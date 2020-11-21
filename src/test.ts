// eslint-disable-next-line jest/no-jest-import
import jest from "jest";

export const test = async (args: string[]): Promise<void> =>
  jest.run([...args, "--env", "jsdom", "--config", JSON.stringify()]);
