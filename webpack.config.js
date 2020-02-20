const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ]
            },
        ],
    },

    plugins: [
        ...config.env === config.DEV ? [new webpack.SourceMapDevToolPlugin({})] : [],

        new HtmlWebpackPlugin({
            title: 'RC',
            author: 'haq',
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        })
    ],
}
