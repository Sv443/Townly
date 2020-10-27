// main game controller

const scl = require("svcorelib");
const ansi = require("ansi");

const display = require("./display");
const dbg = require("./dbg");

const Grid = require("./classes/Grid");
const MultiCellStructure = require("./classes/Cells/MultiCellStructure");

const Constructable = require("./classes/Cells/Constructable");
const TownHall = require("./classes/Cells/Special/TownHall");
const PowerPlant = require("./classes/Cells/Special/PowerPlant");
const WaterPump = require("./classes/Cells/Special/WaterPump");

const settings = require("../settings");


/** @type {Grid} */
var grid;
/** @type {ansi.Cursor} */
var cursor;

/** @type {Constructable[]|MultiCellStructure[]} Stuff the user can build */
const constructables = [
    TownHall,
    PowerPlant,
    WaterPump
];


scl.unused("typedefs:", Constructable, MultiCellStructure);

function init()
{
    return new Promise((pRes, pRej) => {
        scl.unused(pRej);

        cursor = ansi(process.stdout);

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
        if(constr.CellPart != null) // if constructable is a multi cell structure
            registerConstructable(constr.CellPart);
        else
            registerConstructable(constr);
    });
    
    //#SECTION tick interval

    const update = async () => {
        await display.draw(grid);

        let updT = new Date().getTime();
        let avgCUD = await grid.update();
        dbg.setDebugInfo("avgChunkUpdateDelta", avgCUD);

        dbg("CTRL", `Average chunk update delta time: ${dbg.getDebugInfo("avgChunkUpdateDelta")}ms`);
        dbg("CTRL", `Grid update delta time: ${(new Date().getTime() - updT)}ms (max available time per tick: ${1000 / settings.game.tps}ms)`);
    };

    let tickInterval = (1000 / settings.game.tps);

    setInterval(update, tickInterval);
    update();
}

/**
 * Continues a game by loading a save file
 * @param {String} saveFile Path to the save file
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

    grid = gr;
    startGame();
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
    dbg("CTRL-RegisterConstr", `Registering constructable "${constructable.getName()}"`);
}

/**
 * Sets the visibility of the cursor
 * @param {Boolean} visible 
 */
function setCursorVisible(visible)
{
    if(typeof visible != "boolean")
        visible = false;
    
    if(cursor)
    {
        if(visible === true)
            cursor.show();
        else
            cursor.hide();
    }
}

/**
 * Sets the CLI window's title (supports Windows and *nix)
 * @param {String} title
 */
function setWindowTitle(title)
{
    if(typeof title.toString == "function")
        title = title.toString();

    if(process.platform != "win32")
        process.stdout.write(`\x1b]2;${title}\x1b\x5c`); // *nix doesn't have a nice way to set the window title but this escape sequence should be able to do it (search "OSC control sequences" on this page: https://man7.org/linux/man-pages/man4/console_codes.4.html)
    else
        process.title = title; // This should work only on Windows
}

module.exports = { init, continueGame, startNewGame, registerConstructable, setCursorVisible, setWindowTitle };
