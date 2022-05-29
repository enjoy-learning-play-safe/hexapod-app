const CopyPlugin = require('copy-webpack-plugin');
const { NormalModuleReplacementPlugin } = require('webpack');

const commonConfig = require('./webpack.config.base');

module.exports = [
  {
    ...commonConfig,
    entry: './src/main/main.ts',
    target: 'electron-main',
    output: {
      ...commonConfig.output,
      filename: 'main.bundle.js',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
<<<<<<< HEAD
          // 'node_modules/serialport/build/Release/serialport.node',
          // 'node_modules/@serialport/bindings/build/Release/bindings.node',
          'node_modules/@serialport/bindings-cpp/build/Release/bindings.node',
=======
          'node_modules/@serialport/bindings/build/Release/bindings.node',
          // 'node_modules/@serialport/bindings-cpp/build/Release/bindings.node',
>>>>>>> origin/master
        ],
      }),
      new NormalModuleReplacementPlugin(
        /^bindings$/,
        `${__dirname}/../src/bindings`
      ),
      new CopyPlugin({
        patterns: [
          {
            from: 'package.json',
            to: 'package.json',
            // eslint-disable-next-line no-unused-vars
            transform: (content, _path) => {
              const jsonContent = JSON.parse(content);

              delete jsonContent.devDependencies;
              delete jsonContent.scripts;
              delete jsonContent.build;

              jsonContent.main = './main.bundle.js';
              jsonContent.scripts = { start: 'electron ./main.bundle.js' };
              jsonContent.postinstall = 'electron-builder install-app-deps';

              return JSON.stringify(jsonContent, undefined, 2);
            },
          },
        ],
      }),
    ],
  },
  {
    ...commonConfig,
    entry: './src/main/preload.ts',
    target: 'electron-preload',
    devtool: 'inline-source-map',
    output: {
      ...commonConfig.output,
      filename: 'preload.bundle.js',
    },
  },
];
