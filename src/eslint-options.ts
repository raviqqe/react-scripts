import { Linter } from "eslint";

export const eslintOptions: Linter.Config = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      files: ["**/__tests__/*.ts{,x}"],
      rules: {
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/unbound-method": "warn",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "jest",
    "prettier",
    "react",
    "react-hooks",
  ],
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        custom: { match: true, regex: "^I[A-Z]" },
        format: ["PascalCase"],
        selector: "interface",
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true },
    ],
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/prefer-readonly": "error",
    "arrow-body-style": "error",
    "dot-notation": "error",
    "import/no-cycle": "error",
    "import/no-default-export": "error",
    "import/no-unused-modules": "error",
    "import/order": ["error", { alphabetize: { order: "asc" } }],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-console": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-lonely-if": "error",
    "no-return-await": "error",
    "no-useless-return": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-sort-props": "error",
    "sort-keys": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
