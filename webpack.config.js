'use strict';
var webpack = require('webpack'),
	path = require('path');

var APP = path.join(__dirname, 'app');

module.exports = {
	context: APP,
	entry: {
		app: './app.es6'
	},
	output: {
		path: './assets',
		filename: 'bundle.js',
		publicPath: ''
	},
	module: {
		loaders: [{
			test: /\.es6$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'ng-annotate!babel'
		}, {
			test: /\.css$/,
			loader: "style!raw!autoprefixer"
		}, {
			test: /\.html$/,
			loader: "raw"
		}, {
			test: /\.json$/,
			loader: 'json'
		}]
	},
	resolve: {
		extensions: ['', '.es6', '.js', '.html']
	}
};