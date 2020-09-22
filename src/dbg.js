const settings = require("../settings");
const col = require("svcorelib").colors.fg;


/** @typedef {"avgChunkUpdateDelta"} DebugInfoKey */

var debugInfo = {
    avgChunkUpdateDelta: null
};

/**
 * Logs a debug message to the console as long as `settings.verboseLogging` is set to `true`
 * @param {String} section
 * @param {String} message
 */
function dbg(section, message)
{
    if(settings.verboseLogging === true)
        console.log(`${col.yellow}[DBG/${col.blue}${section}${col.yellow}]${col.rst} ${message}`);
}

/**
 * Returns the value of some requested debug information
 * @param {DebugInfoKey} key 
 * @returns {String|Number|null}
 */
function getDebugInfo(key)
{
    return debugInfo[key] || null;
}

/**
 * Sets the value of some debug information
 * @param {DebugInfoKey} key 
 * @param {String|Number} value 
 */
function setDebugInfo(key, value)
{
    debugInfo[key] = value;
}

module.exports = dbg;
module.exports.getDebugInfo = getDebugInfo;
module.exports.setDebugInfo = setDebugInfo;
