import { ESLint } from "eslint";
import { eslintOptions } from "./eslint-options";

export const lint = async (): Promise<void> => {
  const eslint = new ESLint({ baseConfig: eslintOptions, fix: true });

  const results = await eslint.lintFiles("src");

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter();

  // eslint-disable-next-line no-console
  console.log(formatter.format(results));

  if (results.some((result) => result.output)) {
    throw new Error("react-scripts lint fixed errors");
  } else if (results.some((result) => result.errorCount > 0)) {
    throw new Error("react-scripts lint failed");
  }
};
