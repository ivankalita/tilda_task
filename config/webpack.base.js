const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ASSET_PATH = process.env.ASSET_PATH || '/';


const PATH = {
    src: path.resolve(__dirname, '../src'),
    dst: path.resolve(__dirname, '../dist'),
    cfg: path.resolve(__dirname, '../config')
}


module.exports = {
    externals: {
        paths: PATH
    },
    entry: `${PATH.src}/main.js`,
    output: {
        filename: `scripts/bundle_[name].[hash].js`,
        // publicPath: ASSET_PATH,
        path: PATH.dst,
    },
    optimization: {
        minimize: true,
        // minimizer: [
        //     new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true
        //     })
        // ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: `${PATH.cfg}/postcss.config.js`
                            }
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            // stylusOptions: {
                            //     include: [
                            //         `${PATH.src}/styles/fonts.styl`
                            //     ]
                            // }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts',
                    publicPath: '../assets/fonts'

                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: `${PATH.dst}/assets/`
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/bundle_[name].[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${PATH.src}/assets/icons/`,
                    to: `${PATH.dst}/assets/icons/`
                }
            ],
        }),
    ]
}