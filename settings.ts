import * as packageJson from "./package.json";

/** General settings about Townly */
const generalSettings: Readonly<any> = {
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
};

/** Settings of the game */
const gameSettings = {
    /** Settings regarding initialization */
    init: {
        /** @type {NodeJS.Signals[]} Signals that cause a soft shutdown */
        softShutdownSignals: [ "SIGINT", "SIGTERM" ],
    },
    /** Map generation */
    mapGen: {
        /** Settings regarding seeds */
        seed: {
            /** Amount of numerical digits that make up a seed */
            digitCount: 8,
        }
    },
    /** Settings regarding the citizens' needs */
    needs: {
        /** Default importance of a need - float between 0.0 and 1.0 - the higher, the worse citizens will react to unfulfillment */
        defaultImportance: 0.5,
    }
};

/** Game engine settings */
const engineSettings: Readonly<any> = {
    
};


export { generalSettings, gameSettings, engineSettings }