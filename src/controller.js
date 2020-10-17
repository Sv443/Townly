// main game controller

const scl = require("svcorelib");

const display = require("./display");
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
 * Make sure to set the `grid` beforehand!
 */
function startGame()
{
    //#SECTION register constructables
    constructables.forEach(constr => {
        if(constr instanceof MultiCellStructure)
            registerConstructable(constr.CellPart);
        else
            registerConstructable(constr);
    });
    
    //#SECTION tick interval

    const update = async () => {
        await display.draw(grid);

        let avgCUD = await grid.update();
        dbg.setDebugInfo("avgChunkUpdateDelta", avgCUD);

        dbg("CTRL", `Average chunk update delta time: ${dbg.getDebugInfo("avgChunkUpdateDelta")}ms`);
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
    grid = loadGridFromSaveFile(saveFile);
}

/**
 * Starts a new game by generating a new map
 * @param {Number[]} size [W, H]
 * @param {Grid.MapType} preset
 * @param {Number} [seed]
 */
function startNewGame(size, preset, seed)
{
    const pbSteps = 100;

    let pb = new scl.ProgressBar(pbSteps, "Generating Map");

    if(!seed)
        seed = scl.seededRNG.generateRandomSeed();

    const gr = new Grid(size[0], size[1]);

    gr.generateMap(preset, seed, (err, progress) => {
        if(!err)
        {
            let curLayer = progress[0];
            let totLayers = progress[1];
            let curProgress = progress[2];
            let totProgress = progress[3];

            let totalPbProg = (totLayers * totProgress);
            let curPbProg = ((curLayer - 1) + curProgress + 1);

            if(curPbProg % Math.floor(totalPbProg / pbSteps) == 0)
                pb.next(`Generating Map (Stage ${curLayer} of ${totLayers})`);
        }
        else
            console.error(`ERROR: ${err}`);
    });

    dbg("CTRL", `Map created, calling startGame()...`);

    startGame(gr);
}

function loadGridFromSaveFile(saveFile)
{
    // TODO:
    scl.unused(saveFile);

    let g = new Grid(1, 1);
    g.generateMap("Lakes", null);

    return g;
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
