const scl = require("svcorelib");

const Grid = require("./classes/Grid");


scl.unused("typedefs:", Grid);

/**
 * Initializes the Display module
 * @returns {Promise}
 */
function init()
{
    return new Promise((pRes, pRej) => {
        scl.unused(pRej);

        // TODO:

        return pRes();
    });
}

/**
 * Returns the window size in columns and rows
 * @prop {Number[]} padding [ver, hor]
 * @returns {Number[]} [H, W]  /  [Rows, Cols]
 */
function getWindowSize(padding)
{
    return [ (process.stdout.rows - padding[0]), (process.stdout.columns - padding[1]) ] || [ 0, 0 ];
}

/**
 * Gets called on every tick to draw the previously calculated frame and to start the calculation of the next frame
 * @param {Grid} grid
 */
function draw(grid)
{
    let chunks = grid.getActiveChunks();
    
    for(let x = 0; x < chunks.length; x++)
    {
        for(let y = 0; y < chunks.length; y++)
        {
            let chunk = chunks[x][y];
        }
    }
}

module.exports = {
    init,
    getWindowSize,
    draw
};
