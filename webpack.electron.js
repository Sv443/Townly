/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require("path");

module.exports = {
    // Build Mode
    mode: "development",
    // Electron Entrypoint
    entry: "./src/main.ts",
    target: ["electron-main", "es6"],
    resolve: {
        alias: {
            ["@"]: resolve(__dirname, "src"),
            ["lib"]: resolve(__dirname, "src/lib"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: /src/,
            use: [{ loader: "ts-loader" }],
        }]
    },
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
};
