const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/editor.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.html$/,
            //     type: "asset/resource",
            //     generator: {
            //         filename: "[name][ext]",
            //     },
            // },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ],
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Prosemirror-tauri'
        })
    ]
}