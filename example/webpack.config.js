var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var mixins       = require('postcss-mixins');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var appContext = path.join(__dirname, '/');

var NODE_ENV = process.env.NODE_ENV || "production";
console.log(NODE_ENV)

module.exports = {
  context: appContext,
  entry: [
    './js/index',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader?stage=0&optional=runtime'],
      exclude: /node_modules/,
      include: path.join(__dirname, '/js')
    }, {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=[path][name].[ext]?[hash]'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css", { allChunks: true })
  ],
  postcss: function () {
    return [autoprefixer, precss, mixins];
  }
};
