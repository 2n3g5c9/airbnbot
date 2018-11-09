const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  target: "node",
  stats: {
    warningsFilter: /^(?!CriticalDependenciesWarning$)/
  }
};
