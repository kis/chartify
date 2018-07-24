var webpack = require('webpack');
var path = require('path');

var precss  = require('precss');
var cssnext = require('postcss-cssnext');
var vars    = require('postcss-simple-vars');
var nested  = require('postcss-nested');
var mixins  = require('postcss-mixins');

module.exports = {
  mode: "production",
  entry: './src/Chartify.js',
  output: {
    filename: "./index.js",
    sourceMapFilename: './index.js.map',
    library: 'Chartify',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, '/src')
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader' },
        { loader: 'postcss-loader', options: { plugins: () => [...plugins] } }
      ]
    }]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [precss, cssnext, vars, nested, mixins],
      },
    })
  ]
};
