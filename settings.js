const pkg = require("./package.json");

const settings = {
    verboseLogging: true,  // set to true to enable debug logging
    info: {
        name: "Townly",
        desc: pkg.description,
        version: pkg.version,
        versionArr: pkg.version.split(".").map(n => parseInt(n))
    },
    chunks: {
        width: 50,  // how many columns wide a chunk should be
        height: 20  // how many rows tall a chunk should be
    },
    game: {
        tps: 2,  // how many ticks per second (and FPS) the game should run at
    }
};

module.exports = Object.freeze(settings);
