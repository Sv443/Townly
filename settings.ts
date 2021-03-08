import * as packageJson from "./package.json";

/** General settings about Townly */
const generalSettings = Object.freeze({
    /** Everything regarding debugging */
    debug: {
        /** Whether to log debug messages to the console */
        verboseLogging: true
    },
    /** Game info */
    info: {
        /** The name of the game */
        name: "Townly",
        /** Version, as a number array */
        version: packageJson.version.split(/\./g).map(v=>parseInt(v)),
        /** Version, as a string */
        versionStr: packageJson.version,
    }
});

/** Settings of the game */
const gameSettings = Object.freeze({
    /** Settings regarding initialization */
    init: {
        /** @type {NodeJS.Signals[]} Signals that cause a soft shutdown */
        softShutdownSignals: [ "SIGINT", "SIGTERM" ],
    },
    /** World generation */
    worldGen: {
        /** Settings regarding seeds */
        seed: {
            /** Amount of numerical digits that make up a seed */
            digitCount: 8,
        }
    }
});

/** Game engine settings */
const engineSettings = Object.freeze({
    
});


export { generalSettings, gameSettings, engineSettings }