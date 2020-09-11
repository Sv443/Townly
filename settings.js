const pkg = require("./package.json");

const settings = {
    info: {
        name: "Townly",
        desc: pkg.description,
        version: pkg.version,
        versionArr: pkg.version.split(".").map(n => parseInt(n))
    }
};

module.exports = Object.freeze(settings);