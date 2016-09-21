const webpack = require('webpack');
const webpackMerge = require('webpack-merge').smart;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/index.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
      },
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
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'site/pages'],
  },
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
    'dev-app': './dev/browser-app/index.js',
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
});

const devCompilerConfig = webpackMerge(baseConfig, {
  entry: {
    'dev-compiler': './dev/compiler/index.js',
  },
  target: 'node',
});

module.exports = [
  lambdaConfig,
  devAppConfig,
  devCompilerConfig,
];
