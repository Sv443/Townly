const settings = require("../settings");
const col = require("svcorelib").colors.fg;


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

module.exports = dbg;
