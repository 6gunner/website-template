const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    hot: true,
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      CDN_URL: JSON.stringify(""),
    }),
  ],
});
