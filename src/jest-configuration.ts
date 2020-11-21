import { join } from "path";

export const jestConfiguration = JSON.stringify({
  transform: join(__dirname, "jest-transformer.js"),
});
