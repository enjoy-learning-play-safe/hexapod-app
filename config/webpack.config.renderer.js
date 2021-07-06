const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// eslint-disable-next-line max-len
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const commonConfig = require('./webpack.config.base');

const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  ...commonConfig,
  entry: './src/renderer/renderer.tsx',
  // target: 'electron-renderer',
  target: 'web',
  output: {
    ...commonConfig.output,
    filename: 'renderer.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    ...(isEnvDevelopment
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new ReactRefreshWebpackPlugin(),
        ]
      : []),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  performance: {
    maxAssetSize: 17000000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith('.js');
    },
  },
};
