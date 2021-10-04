const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.filename1$/,
                use: ["loader-b", "loader-a"]
            },
            {
                test: /\.filename2$/,
                use: ["loader-d", "loader-c"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ]
    },
    mode: 'development',
    entry: './source/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "source", "index.html"),
            scriptLoading: "blocking"
        })
    ]
}