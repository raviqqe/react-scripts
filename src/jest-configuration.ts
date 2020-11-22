import { join } from "path";

export const jestConfiguration = {
  transform: {
    "\\.(ts|tsx)$": join(__dirname, "jest-transformer.js"),
  },
};
