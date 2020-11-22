import { join } from "path";

export const jestConfiguration = {
  collectCoverage: true,
  transform: {
    "\\.(ts|tsx)$": join(__dirname, "jest-transformer.js"),
  },
};
