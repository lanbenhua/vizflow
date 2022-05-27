/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: `${__dirname}/index.ts`,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3001,
    https: false,
    proxy: {
      '/ds': 'http://10.96.78.213:3000/mock/11',
    },
  },
  plugins: [new HtmlWebpackPlugin()],
  watch: true,
};
