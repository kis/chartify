var webpack = require('webpack');
var path = require('path');

var precss  = require('precss');
var cssnext = require('postcss-cssnext');
var vars    = require('postcss-simple-vars');
var nested  = require('postcss-nested');
var mixins  = require('postcss-mixins');

module.exports = {
  mode: "production",
  entry: {
    app: ['@babel/polyfill', './src/Chartify.tsx'],
  },
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
      test: /\.js|\.ts|\.tsx?$/,
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
  },
  resolveLoader: {
    modules: ['node_modules'],
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
