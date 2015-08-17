'use strict';
var webpack = require('webpack'),
	path = require('path');

var APP = path.join(__dirname, 'app');

module.exports = {
	context: APP,
	entry: {
		app: ['webpack/hot/dev-server', './app.es6']
	},
	output: {
		path: './',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.es6$/,
			exclude: /(node_modules|bower_components)/,
			loaders: ['uglify', 'ng-annotate', 'babel-loader']
		}, {
			test: /\.css$/,
			loader: "style!css!autoprefixer"
		}, {
			test: /\.(html|svg)$/,
			loader: "html"
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
			loader: "file"
		}]
	},
	resolve: {
		extensions: ['', '.es6', '.js', '.html']
	}
};