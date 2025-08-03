const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // For injecting bundled assets into HTML
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineAssetsPlugin = require('./InlineAssetsPlugin'); // Custom plugin to inline assets

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    code: './src/code.ts',
    uistyles: "./src/app/style.css",
    ui: './src/app/script.ts',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js|css)$',
      inject: false, // Prevent automatic injection
      minify: false,
      // chunks: ['ui'],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new InlineAssetsPlugin({
      // htmlFile: "./src/ui.html",
      includeEntries: ["ui", "uistyles"], // Only inline "main"
      jsPlaceholder: "@INLINE-JS",
      cssPlaceholder: "@INLINE-CSS",
      removeInlinedFiles: true,
      minify: true,
    }),
  ],
});