import babelJest from "babel-jest";

module.exports = babelJest.createTransformer({
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
});
