const webpack = require('webpack'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "src/scripts/app.js")
    },
    output: {
        path: path.resolve(__dirname, "public/js"),
        publicPath: "/public/",
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.sass$/,
                use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: ["vue-style-loader", "css-loader", "sass-loader"],
                        sass: [
                            "vue-style-loader",
                            "css-loader",
                            "sass-loader?indentedSyntax"
                        ]
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(frag|vert)$/,
                loader: 'webpack-glsl-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
       proxy: {
            '*' : {
                target: 'http://localhost:3000/',
                secure: false,
            }
        },
        contentBase: path.join(__dirname, "public"),
        publicPath: "/js",
        historyApiFallback: true,
        noInfo: false,
        overlay: true
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devtool: "#eval-source-map"
};

if (process.env.NODE_ENV) {
    module.exports.entry = Object.assign(module.exports.entry, {
        admin: path.resolve(__dirname, "src/admin/main.js")
    })
}

if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "#source-map";
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

    ]);
}