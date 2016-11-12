//Webpack dev server

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	historyApiFallback: true,
	publicPath: config.output.publicPath,
	contentBase: '.',
  	hot: true,
	stats: {
		colors: true
	}
});

server.listen(3001, 'localhost', function (err) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:3001');
});
