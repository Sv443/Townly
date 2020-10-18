const pkg = require("./package.json");

const settings = {
    /** Set to true to enable debug logging */
    verboseLogging: true,
    /** Info about the game */
    info: {
        /** Name of the game */
        name: "Townly",
        /** Short description of the game */
        desc: pkg.description,
        /** Version number */
        version: pkg.version,
        /** Version number as a number array */
        versionArr: pkg.version.split(".").map(n => parseInt(n)),
        /** The author of Townly */
        author: pkg.author
    },
    /** Settings for the game's menus */
    menus: {
        /** Main Menu */
        main: {
            /** Whether or not the banner in the main menu should be enabled */
            bannerEnabled: false
        }
    },
    /** Settings for the chunks that contain the cells */
    chunks: {
        /** How many columns wide a chunk should be */
        width: 50,
        /** how many rows tall a chunk should be */
        height: 20
    },
    /** Settings that affect the actual game */
    game: {
        /** How many ticks per second (and FPS) the game should run at */
        tps: 0.5,
    }
};

module.exports = Object.freeze(settings);
