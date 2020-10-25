const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dst,
        port: 9000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Tilda | New Busket',
            filename: "./index.html",
            favicon: `${baseWebpackConfig.externals.paths.src}/public/favicon.ico`,
            template: `${baseWebpackConfig.externals.paths.src}/public/index.html`,
            inject: true,
            minify: false,
            hash: false
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})