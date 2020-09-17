const pkg = require("./package.json");

const settings = {
    verboseLogging: false,
    info: {
        name: "Townly",
        desc: pkg.description,
        version: pkg.version,
        versionArr: pkg.version.split(".").map(n => parseInt(n))
    },
    chunks: {
        width: 50,
        height: 20
    }
};

module.exports = Object.freeze(settings);
