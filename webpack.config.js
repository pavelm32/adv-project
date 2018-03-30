const webpack = require('webpack'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      path = require("path");

module.exports = {
    output: {
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(frag|vert)$/,
                loader: 'webpack-glsl-loader'
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devtool: "#eval-source-map"
};