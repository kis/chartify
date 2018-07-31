const TARGET = process.env.NODE_ENV;

if (TARGET === 'development') {
    module.exports = require('./webpack.config.dev');
    console.info('use ./webpack.config.dev.js');
}
if (TARGET === 'production') {
    module.exports = require('./webpack.config.prod');
    console.info('use ./webpack.config.prod.js');
}