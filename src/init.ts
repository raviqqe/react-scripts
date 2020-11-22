import { symlink } from "fs/promises";
import { relative, join } from "path";

const tsConfigPath = "tsconfig.json";

export const init = async (): Promise<void> => {
  // TODO Remove this link when @typescript-eslint/parser allows passing
  // compiler options directly in JavaScript.
  await symlink(relative(".", join(__dirname, tsConfigPath)), tsConfigPath);
};
