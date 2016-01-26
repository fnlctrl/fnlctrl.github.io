'use strict';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        'bundle': './'
    },
    output: {
        path: './dist',
        filename: '[name].js',
        publicPath: 'dist' // for dev server
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(less|css)$/,
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
        }, {
            test: /\.png$/,
            loader: "url?limit=10000000000000000000000"
        }, {
            test: /\.(html|svg)/,
            loader: 'vue-html'
        }, {
            test: /\.md$/,
            loader: "raw"
        }]
    },
    resolve: {
        modulesDirectories: ['src', 'data', 'components', 'node_modules', 'lib']
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {allChunks: true})
    ],
    devServer: {
        port: 1234,
        inline: true,
        host: "0.0.0.0",
        historyApiFallback: {
            index: 'src/index.html'
        }
    }
};