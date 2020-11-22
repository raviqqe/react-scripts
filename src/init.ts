import { copyFile } from "fs/promises";
import { resolve } from "path";

const tsConfigPath = "tsconfig.json";

export const init = async () => {
  // TODO Remove this link when @typescript-eslint/parser allows passing
  // compiler options directly in JavaScript.
  await copyFile(resolve(__dirname, tsConfigPath), tsConfigPath);
};
