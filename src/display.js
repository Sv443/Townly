const scl = require("svcorelib");

const Grid = require("./classes/Grid");
const Camera = require("./classes/Camera");


/** @type {Camera} */
var cam = null;

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

        cam = new Camera(Camera.getWindowSize());

        return pRes();
    });
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

/**
 * Sets the camera's position
 * @param {Number} x width
 * @param {Number} y height
 */
function setCameraPos(x, y)
{
    return cam.setPosition(x, y);
}

/**
 * Moves the camera in a certain direction
 * @param {Camera.Direction} direction 
 * @param {Number} amount 
 */
function moveCamera(direction, amount)
{
    return cam.move(direction, amount);
}

module.exports = {
    init,
    draw,
    setCameraPos,
    moveCamera
};
