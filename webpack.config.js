const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { sep, resolve } = require('path')

module.exports = {
    entry: resolve(__dirname, `${sep}src${sep}api${sep}client${sep}index.js`),
    output: {
        path: resolve(__dirname, `src${sep}api${sep}client${sep}dist`),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.bundle.css'
        })
    ]
}