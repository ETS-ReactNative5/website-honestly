const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const baseConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',

      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
  ],
};

const lambdaConfig = webpackMerge(baseConfig, {
  entry: {
    'publish-service': './publish-service/index.js',
  },
  output: {
    libraryTarget: 'commonjs',
  },
  target: 'node',
  externals: [
    'aws-sdk',
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
      },
    }),
  ],
});

const devAppConfig = webpackMerge(baseConfig, {
  entry: {
    'dev-app': './dev-app/index.js',
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
});

module.exports = [
  lambdaConfig,
  devAppConfig,
];
