import { join } from "path";

export const jestConfiguration = {
  transform: {
    "\\.ts{,x}$": join(__dirname, "jest-transformer.js"),
  },
};
