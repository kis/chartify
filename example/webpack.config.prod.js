const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: ['@babel/polyfill', 'react-hot-loader/patch', './js/index'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: 'https://chartify-213721.firebaseapp.com/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js|\.ts|\.tsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      exclude: /node_modules/,
      include: path.join(__dirname, '/js'),
    }, {
      test: /\.css?$/,
      use: [
        ExtractCssChunks.loader,
        { loader: 'css-loader' },
        { loader: 'postcss-loader', options: { plugins: () => [...plugins] } },
      ],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        {
          loader: 'image-webpack-loader',
        },
      ],
    }, {
      test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
      loaders: ['file-loader?name=font/[name].[ext]'],
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    alias: {
      // constants: path.resolve(__dirname, './src/constants'),
      // '@components': path.resolve(__dirname, './src/views/components'),
      // '@containers': path.resolve(__dirname, './src/views/containers'),
      // helpers: path.resolve(__dirname, './src/helpers'),
      // reducers: path.resolve(__dirname, './src/domain/reducers'),
      // selectors: path.resolve(__dirname, './src/domain/selectors'),
      // store: path.resolve(__dirname, './src/domain/store'),
      // actions: path.resolve(__dirname, './src/domain/actions'),
      // '@typings': path.resolve(__dirname, './src/typings'),
      // '@views': path.resolve(__dirname, './src/views'),
      // '@services': path.resolve(__dirname, './src/domain/services'),
    },
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      cache: true,
    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      hot: true,
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true, // if you use cssModules, this can help.
    }),
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          extractComments: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  ]
};
