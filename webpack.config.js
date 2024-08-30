const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const optimization = () => ({
  splitChunks: {
    chunks: 'all', // Оптимізація загального коду для всіх типів чанків
  },
  minimizer: [
    new CssMinimizerWebpackPlugin(), // Мінімізація CSS файлів
    new TerserPlugin() // Мінімізація JS файлів
  ]
});

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  target: "web",
  devServer: {
    port: 4200,
    hot: false,
  },
 optimization: optimization(),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      // Styles
      { test: /\.css$/, use: ["style-loader", "css-loader"] },

      //img
      { test: /\.(gif|png|jpg|svg)$/, use: ["file-loader"] },

      // Fonts
      { test: /\.(eot|otf|ttf|woff|woff2)$/, use: ["file-loader"] },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
          // Less
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "less-loader", // Додаємо 'less-loader' для обробки .less файлів
        ],
      },
          // SCSS/SASS
      {
        test: /\.s[ac]ss$/, // Регулярний вираз, що відповідає і .sass, і .scss файлам
        use: [{ loader: MiniCssExtractPlugin.loader, // Витягує CSS у окремі файли
            options: {
              publicPath: "",
            },
          },
          "css-loader", // Обробляє CSS
          "sass-loader", // Компілює Sass/SCSS у CSS
        ],
      },
      // Babel JS
      {
        test: /\.js$/, // Відповідає усім .js файлам
        exclude: /node_modules/, // Виключає папку node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Використовує preset-env для транспіляції сучасного JS
          }
        }
      },
      // Babel TS
      {
        test: /\.ts$/, // Вказуємо, що файл з розширенням .ts повинен бути оброблений
        exclude: /node_modules/, // Виключаємо директорію node_modules з обробки
        use: {
          loader: 'babel-loader', // Використовуємо babel-loader для компіляції
          options: {
            presets: [
              '@babel/preset-env', // Перетворення ES6+ у сумісний код JavaScript
              '@babel/preset-typescript' // Додавання підтримки TypeScript
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images/favicon.png"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new EslintWebpackPlugin({
      extensions: ['js'], // Визначаємо розширення файлів для перевірки
      fix: true // Вмикаємо автоматичне виправлення помилок
    }),
  ],
};
