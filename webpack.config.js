'use strict';
var webpack = require('webpack'),
	path = require('path');

var APP = path.join(__dirname, 'app');
var libDir = path.join(__dirname, '/lib');

module.exports = {
	context: APP,
	entry: {
		app: ['./app.es6']
	},
	output: {
		path: './build',
		filename: 'bundle.js',
		publicPath: 'build'
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
			test: /\.(html|md)$/,
			loader: "raw"
		}, {
			test: /\.json$/,
			loader: 'json'
		}]
	},
	resolve: {
		extensions: ['', '.es6', '.js', '.html'],
		alias: {
			FTColumnflow: path.join(libDir, 'FTColumnflow.js')
		}
	}
};