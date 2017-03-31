var webpack = require('webpack');
var path = require('path');

var precss  = require('precss');
var cssnext = require('postcss-cssnext');
var vars    = require('postcss-simple-vars');
var nested  = require('postcss-nested');
var mixins  = require('postcss-mixins');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var appContext = path.join(__dirname, '/main');

module.exports = {
  context: appContext,
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.js?$/,
      use: ['react-hot-loader/webpack', 'babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, '/main')
    }, {
      test: /\.css?$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { plugins: () => [...plugins] } }
        ]
      })
    }]
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: './[name].css', allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [precss, cssnext, vars, nested, mixins]
      }
    })
  ]
};
