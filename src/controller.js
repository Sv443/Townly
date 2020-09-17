// main game controller

const scl = require("svcorelib");

const display = require("./display");
const input = require("./input");
const dbg = require("./dbg");
const Grid = require("./classes/Grid");

const settings = require("../settings");


/** @type {Grid} */
var grid;


function init()
{
    return new Promise((pRes, pRej) => {
        
    });
}

/**
 * To be called to start the game.  
 * Starts the tick and frame interval.
 * @param {Grid} grid 
 */
function startGame(grid)
{
    const update = async () => {
        await display.draw(grid);

        let avgChunkUpdateDelta = await grid.update();
    };

    let tickInterval = (1000 / settings.game.tps);

    setInterval(update, tickInterval);
    update();
}

/**
 * Continues a game by loading a save file
 * @param {String} saveFile 
 */
function continueGame(saveFile)
{

}

/**
 * Starts a new game by generating a new map
 * @param {Number[]} size [W, H]
 * @param {Grid.MapType} preset
 */
function startNewGame(size, preset)
{
    const gr = new Grid(size[0], size[1]);

    gr.generateMap(preset);

    startGame(gr);
}

module.exports = { init, continueGame, startNewGame };
