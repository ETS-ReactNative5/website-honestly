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
      {
        test: /\.(png|jpe?g|eot|ttf|woff|woff2)$/, exclude: [/dist\//, /node_modules/], loader: 'file-loader', query: { name: '[name]-[hash:base64:5].[ext]' },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
  postcss() {
    return [
      require('autoprefixer'), // eslint-disable-line global-require
    ];
  },
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
};

const devAppConfig = webpackMerge(baseConfig, {
  entry: {
    'dev-app': './dev/browser-app/index.js',
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Red Badger',
      template: 'index.ejs',
    }),
  ],
});

module.exports = [
  devAppConfig,
];
