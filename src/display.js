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
    // TODO:
    let renderGrid = cam.render(grid);

    scl.unused(renderGrid);
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
