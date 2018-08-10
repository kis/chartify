//Webpack dev server

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
	historyApiFallback: true,
	publicPath: config.output.publicPath,
	contentBase: '.',
  	hot: true,
  	inline: true,
	stats: {
		colors: true,
		chunks: false 
	},
	watchOptions: {
	 	aggregateTimeout: 300,
	 	poll: 1000,
	},
}).listen(3001, 'localhost', (err) => {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:3001');
});
