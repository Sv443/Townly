import * as packageJson from "./package.json";

/** Teng engine settings */
const tengSettings = Object.freeze({
    info: {
        /** The name of the engine */
        name: "Teng",
        /** Version, as a number array */
        version: packageJson.version.split(/\./g).map(v=>parseInt(v)),
        /** Version, as a string */
        versionStr: packageJson.version,
    }
});

export { tengSettings }