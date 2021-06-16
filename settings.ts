import * as packageJson from "./package.json";

import { Size } from "./engine/core/BaseTypes";

// import { resolve } from "path";


/** General Townly settings */
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
        /** Name of the current version range (Alpha, Beta, Release) */
        versionRangeName: "Alpha",
        /** TODO: some fucking how automate this with CI? Like idk even know how, this is an interpreted language? */
        buildNbr: 1,
    }
});

/** Settings of the game itself */
const gameSettings = Object.freeze({
    /** Settings regarding initialization */
    init: {
        /** @type {NodeJS.Signals[]} Signals that cause a soft shutdown */
        softShutdownSignals: [ "SIGINT", "SIGTERM" ],
    },
    /** Game loop */
    loop: {
        /** Amount of ticks per second that should be targeted */
        targetTps: 5
    },
    /** Map generation */
    mapGen: {
        /** Settings regarding seeds */
        seed: {
            /** Amount of numerical digits that make up a seed */
            digitCount: 8,
        }
    },
    game: {
        chunkSize: new Size(25, 10)
    },
    /** Settings regarding the citizens' needs */
    needs: {
        /** Default importance of a need - float between 0.0 and 1.0 - the higher, the worse citizens will react to unfulfillment */
        defaultImportance: 0.5,
    }
});


export { generalSettings, gameSettings }