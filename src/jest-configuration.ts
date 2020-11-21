import { join } from "path";

export const jestConfiguration = JSON.stringify({
  transform: {
    "\\.ts{,x}$": join(__dirname, "jest-transformer.js"),
  },
});
