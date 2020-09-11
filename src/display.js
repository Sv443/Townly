const scl = require("svcorelib");


/**
 * Initializes the Display module
 */
function init()
{
    return new Promise((pRes, pRej) => {
        scl.unused(pRej);

        return pRes();
    });
}

/**
 * Returns the window size in columns and rows
 * @returns {Array<Number>} [H, W]  /  [Rows, Cols]
 */
function getWindowSize()
{
    return [process.stdout.rows, process.stdout.columns] || [0, 0];
}

module.exports = {
    init,
    getWindowSize
};
