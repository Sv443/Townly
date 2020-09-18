// main game controller

const scl = require("svcorelib");

const display = require("./display");
const input = require("./input");
const dbg = require("./dbg");

const Grid = require("./classes/Grid");
const Constructable = require("./classes/Cells/Constructable");
const TownHall = require("./classes/Cells/Special/TownHall");

const settings = require("../settings");
const PowerPlant = require("./classes/Cells/Special/PowerPlant");
const MultiCellStructure = require("./classes/Cells/MultiCellStructure");


/** @type {Grid} */
var grid;

/** @type {Constructable[]|MultiCellStructure[]} Stuff the user can build */
const constructables = [
    TownHall,
    PowerPlant
];


scl.unused("typedefs:", Constructable);

function init()
{
    return new Promise((pRes, pRej) => {
        scl.unused(pRej);

        //TODO:

        return pRes();
    });
}

/**
 * To be called to start the game.  
 * Starts the tick and frame interval.
 * @param {Grid} grid 
 */
function startGame(grid)
{
    //#SECTION register constructables
    constructables.forEach(constr => {
        if(constr instanceof MultiCellStructure)
            constr = constr.CellPart;

        registerConstructable(constr);
    });
    
    //#SECTION tick interval

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

/**
 * Registers a constructable class so the user can build it
 * @param {Constructable} constructable The class that inherits from Constructable - NOT AN INSTANCE OF THE CLASS!
 */
function registerConstructable(constructable)
{
    dbg("CTRL-RegisterConstr", `Registering constructable ${constructable.getName()}`);
}

module.exports = { init, continueGame, startNewGame, registerConstructable };
