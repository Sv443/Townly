const keypress = require("keypress");
const scl = require("svcorelib");



/**
 * Initializes the input module
 * @returns {Promise<undefined, String>}
 */
function init()
{
    return new Promise((pRes, pRej) => {
        if(!process.stdin)
            return pRej("Process doesn't have a stdin");

        if(!process.stdin.isTTY)
            return pRej("Stdin is not TTY-compatible");

        if(!process.stdin.isRaw)
            process.stdin.setRawMode(true);

        keypress(process.stdin);

        return pRes();
    });
}

/**
 * Sets up an event listener that waits for a key press
 * @returns {Promise<String>} Promise containing the pressed key
 */
function awaitKeypress()
{
    return new Promise(pRes => {
        process.stdin.on("keypress", (char, key) => {
            scl.unused(char);

            process.stdin.removeAllListeners(["keypress"]);

            return pRes(key);
        });
    });
}

module.exports = {
    init,
    awaitKeypress
};
