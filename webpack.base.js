const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },

  // 打包时不打包进去，通过外部环境提供
  externals: {},

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: require.resolve("./src/libs/qrcode.js"),
        loader: "exports-loader?window.QRCode!script-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      qrcode: path.resolve(__dirname, "./src/libs/qrcode.js"),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.ProvidePlugin({

    // }),
    // 主要用来copy静态文件
    new CopyWebpackPlugin(
      [
        {
          from: "src/assets/",
          to: "assets/",
        },
        {
          from: "public/",
          to: "public/",
        },
      ],
      {
        ignore: [],
        debug: "debug",
        copyUnmodified: true,
      }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html",
    }),
  ],
};
