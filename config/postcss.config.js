// npm i autoprefixer css-mqpacker cssnano postcss-loader -D

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}