const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = require('./config')

module.exports = {
    // 打包环境
    mode: config.env,
    entry: './src/web/index.js',
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

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
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
            template: './src/web/index.html',
            bundle_time: config.bundle_time,
            filename: config.env === config.DEV ? 'index.html' : 'index.[hash].html',
        }),

        // 独立打包CSS文件
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
        }),

        // 全局变量
        new webpack.ProvidePlugin({
            R: 'ramda',
            React: 'react',
            ky: 'ky',
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
            SRC: path.resolve(__dirname, './src/web'),
            IMG: path.resolve(__dirname, './content/img'),
        },
    },

    // 开发服务器
    devServer: {
        // 启用webpack的热模块更换功能
        hot: true,
        // 静态文件入口
        contentBase: path.join(__dirname, './content'),
        // 压缩
        compress: true,
        // 端口
        port: 7000,
        // 自动打开浏览器
        // open: true,
        proxy: {
            '/get_current_data': {
                target: 'https://hq.sinajs.cn',
                changeOrigin: true,
                pathRewrite: {'^/get_current_data' : ''},
            },
            '/get_contract_data': {
                target: 'https://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine',
                // 改变源
                changeOrigin: true,
                // 不传递到路径
                pathRewrite: {'^/get_contract_data' : ''},
            },
        },
    },

}
