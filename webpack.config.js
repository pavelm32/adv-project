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
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['es2015']
                // }
            },
            {
                test: /\.(frag|vert)$/,
                loader: 'webpack-glsl-loader'
            }
        ]
        /*loaders: [
            {
                test: /\.(frag|vert)$/,
                loader: 'webpack-glsl'
            }
        ]*/
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
};