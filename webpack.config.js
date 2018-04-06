const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const OUTPUT_PATH = path.resolve('./dist')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        bundle: './src/index.js'
    },
    output: {
        path: OUTPUT_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(less|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'less-loader'
            ]
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
        }, {
            test: /\.svg/,
            loader: 'svg-sprite-loader',
            options: {
                extract: true,
                runtimeGenerator: path.resolve('./src/lib/svg-runtime-generator'),
            }
        }, {
            test: /\.md$/,
            loader: 'raw-loader'
        }]
    },
    resolve: {
        modules: ['src', 'data', 'icons', 'components', 'node_modules', 'lib'],
        extensions: ['.vue', '.svg', '.js']
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inlineSource: isProduction ? '.(js|css)$' : '',
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CopyWebpackPlugin([{ from: './assets', to: './assets' }]),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: isProduction ? '"production"' : '"dev"', }
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
            spriteAttrs: { style: 'height: 0; width: 0; position: absolute;' }
        })
    ],
    devtool: isProduction ? '' : '#sourcemap',
    devServer: {
        contentBase: OUTPUT_PATH,
        port: 1234,
        inline: true,
        host: '0.0.0.0',
        historyApiFallback: {
            index: '/index.html'
        }
    }
}