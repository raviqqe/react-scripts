import { join } from "path";

export const jestConfiguration = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts{,x}"],
  transform: {
    "\\.(ts|tsx)$": join(__dirname, "jest-transformer.js"),
  },
};
