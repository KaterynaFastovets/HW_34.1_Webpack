const path = require ("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      
        // Styles
        {test: /\.css$/,
        use: ["style-loader", "css-loader"],},

        //img
        {test: /\.(gif|png|jpg|svg)$/,
        use: ["file-loader"],},

        // Fonts
        {test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"), 
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
