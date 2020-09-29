const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NotePlugin = require('../plugin/note.js');
const NewHtmlPlugin = require('../plugin/NewHtmlPlugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public')
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.json'],
        alias: {}
    },
    // 设置loader的检索路径，用于调试本地loader开发
    resolveLoader: {
        alias: {
            'mine-loader': path.resolve(__dirname, '../loader/mineLoader.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: [
                    { loader: 'babel-loader' }, // 'babel-loader' is also a legal name to reference
                    { // 自定义loader，执行在babel-loader之前，可以对js资源按需做一些处理
                        loader: 'mine-loader',
                        options: {
                            value: '我是自定义loader传入的参数'
                        } 
                    }
                ], 
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 公用模块抽离
                common: {
                    chunks: 'initial',
                    minSize: 0, // 大于0个字节
                    minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数
                },
                // 第三方库抽离
                vendor: {
                    priority: 1, // 权重
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0, // 大于0个字节
                    minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        // 动态向bundle.js内插入js脚本
        new NotePlugin({ name: 'Note' }),
        // 一定自定义的HtmlWebpackPlugin
        new NewHtmlPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'newIndex.html'
        })
    ]
};