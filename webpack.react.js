/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");

module.exports = {
    mode: "development",
    entry: "./src/renderer.tsx",
    target: ["electron-renderer", "es6"],
    devtool: "source-map",
    devServer: {
        contentBase: join(__dirname, "dist/renderer.js"),
        compress: true,
        port: 9000,
    },
    resolve: {
        alias: {
            ["@"]: resolve(__dirname, "src"),
            ["lib"]: resolve(__dirname, "src/lib"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: "ts-loader" }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    output: {
        path: __dirname + "/dist",
        filename: "renderer.js",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
