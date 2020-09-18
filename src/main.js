const scl = require("svcorelib");

const input = require("./input");
const controller = require("./controller");
const display = require("./display");
const dbg = require("./dbg");

const CustomSelectionMenu = require("./classes/CustomSelectionMenu");
const LayeredNoise = require("./classes/LayeredNoise");
const Cell = require("./classes/Cell");
const Grid = require("./classes/Grid");

const settings = require("../settings");

const col = scl.colors.fg;


var townlyBannerSeed = scl.seededRNG.generateRandomSeed(10);

/**
 * Async pre-initialization that gets called before anything else
 * @returns {Promise}
 */
function preInit()
{
    return new Promise((pRes, pRej) => {
        const runPreInit = (async () => {
            try
            {
                dbg("PreInit", `Initializing input module...`);
                await input.init();
                dbg("PreInit", `Initializing game controller...`);
                await controller.init();
                dbg("PreInit", `Initializing display module...`);
                await display.init();

                return pRes();
            }
            catch(err)
            {
                return pRej(err);
            }
        });

        return runPreInit();
    });
}

/**
 * Initializes everything - to be called to init and start the game
 */
async function initAll()
{
    await preInit();

    // TODO:

    mainMenu();
}

/**
 * Shows the main menu
 */
function mainMenu()
{
    // TODO:
    let mm = new CustomSelectionMenu(`${settings.info.name} - Main Menu:`, {
        overflow: true,
        cancelable: false
    });

    const redraw = () => {
        let bannerChars = bannerSmoothPerlin(30, townlyBannerSeed, 5, false);

        console.clear();
        console.log(`${bannerChars}\n`);
    };

    mm.onCursorMove(() => redraw());

    mm.setOptions([
        "Continue",
        "New Game",
        "Settings",
        // "Plugins",
        "Exit"
    ]);

    mm.onSubmit().then(res => {
        console.clear();

        switch(res.option.index)
        {
            case 0: // Continue

            break;
            case 1: // New Game

            break;
            case 2: // Settings
                return settingsMenu();
            case 3: // Exit
                console.log("Goodbye.");
                setTimeout(() => process.exit(0), 200);
            break;
        }
    });

    redraw();
    mm.open();
}

function settingsMenu()
{
    let sm = new scl.SelectionMenu(`${settings.info.name} - Settings:`, {
        overflow: true,
        cancelable: false
    });

    sm.setOptions([
        "\"Graphics\"",
        "Gameplay",
        "Controls",
        "Back to Main Menu"
    ]);

    sm.onSubmit().then(res => {
        switch(res.option.index)
        {
            case 0: // Graphics

            break;
            case 1: // Gameplay
            
            break;
            case 2: // Controls

            break;
            case 3: // Exit
                return mainMenu();
        }
    });

    sm.open();
}

function bannerSmoothPerlin(height, seed, passes, extraSmooth)
{
    let logChars = "";

    let ln = new LayeredNoise(process.stdout.columns, height);

    ln.addLayer("perlin", seed, 2.5);
    
    /** @type {Cell[][]} */
    let cells = [];
    
    ln.layers[0].forEach((valX, x) => {
        scl.unused(valX);
        cells.push([]);

        valX.forEach((valY, y) => {
            let cell = new Cell("land");

            if(valY < 0.4)
                cell.setType("deepwater");
            else if(valY < 0.5)
                cell.setType("water");
            else if(valY < 0.575)
                cell.setType("land");
            else
                cell.setType("forest");

            cells[x][y] = cell;
        });
    });

    if(passes > 0)
        Grid.smoothGrid(cells, passes, extraSmooth);

    let lastCellType = null;

    cells.forEach((row) => {
        row.forEach((cell) => {
            switch(cell.type)
            {
                case "water":
                    cell.char = "▒";
                    cell.setColors("cyan", "blue");
                break;
                case "deepwater":
                    cell.char = "▒";
                    cell.setColors("blue", "black");
                break;
                case "forest":
                    cell.char = "▒";
                    cell.setColors("green", "black");
                break;
                case "land":
                    cell.char = "█";
                    cell.setColors("green", "green");
                break;
            }

            if(cell.type != lastCellType)
            {
                lastCellType = cell.type;

                logChars += `${col.rst}${cell.getColors(true).bg}${cell.getColors(true).fg}${cell.char}`;
            }
            else
            {
                logChars += cell.char;
            }
        });
    });

    logChars += `${col.rst}\n`;
    
    return logChars;
}

module.exports = { initAll };
