import { symlink } from "fs/promises";
import { relative, resolve } from "path";

const tsConfigPath = "tsconfig.json";

export const init = async () => {
  // TODO Remove this link when @typescript-eslint/parser allows passing
  // compiler options directly in JavaScript.
  await symlink(relative(".", resolve(__dirname, tsConfigPath)), tsConfigPath);
};
