import { copyFile } from "fs/promises";
import { resolve } from "path";

const tsConfigPath = "tsconfig.json";

export const init = async () => {
  await copyFile(resolve(__dirname, tsConfigPath), tsConfigPath);
};
