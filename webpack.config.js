const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = require('./config')

module.exports = {
    // 打包环境
    mode: config.env,
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
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
                ],
            },
        ],
    },

    plugins: [

        // 源代码
        ...config.env === config.DEV ? [new webpack.SourceMapDevToolPlugin({})] : [],

        // html生成
        new HtmlWebpackPlugin({
            title: 'RC',
            version: config.version,
            author: 'haq',
            template: './src/index.html',
            bundle_time: config.bundle_time,
            filename: 'index.html',
        }),

        // 独立打包CSS文件
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
        }),

        // 全局变量
        new webpack.ProvidePlugin({
            R: 'ramda',
        }),

        // 清理dist
        new CleanWebpackPlugin(),

        // 热加载
        new webpack.HotModuleReplacementPlugin(),
    ],

    // 全局别名
    resolve: {
        moduleExtensions: [path.resolve(__dirname, 'node_modules')],
        alias: {
            SYS: path.resolve(__dirname, './'),
            SRC: path.resolve(__dirname, './src'),
        },
    },

    // 开发服务器
    devServer: {
        // 启用webpack的热模块更换功能
        hot: true,
        // 静态文件入口
        contentBase: path.join(__dirname, 'dist'),
        // 
        compress: true,
        port: 7000,
        open: true,
    },
}
