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
    // TODO: do this properly
    let chunks = grid.getActiveChunks();
    
    for(let h = 0; h < grid.size[1]; h++)
    {
        for(let w = 0; w < grid.size[0]; w++)
        {
            let cell = grid.getCell(0, 0);

            process.stdout.write(`${cell.getChar()}`);
        }
        process.stdout.write("\n");
    }
}

module.exports = {
    init,
    getWindowSize,
    draw
};
