const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    // publicPath: '/',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Tilda | New Busket',
            filename: "./index.html",
            favicon: `${baseWebpackConfig.externals.paths.src}/public/favicon.ico`,
            template: `${baseWebpackConfig.externals.paths.src}/public/index.html`,
            inject: true,
            minify: true
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})