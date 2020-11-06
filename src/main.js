const scl = require("svcorelib");

const input = require("./input");
const controller = require("./controller");
const display = require("./display");
const dbg = require("./dbg");
const tr = require("./translate");

const CustomSelectionMenu = require("./classes/CustomSelectionMenu");
const LayeredNoise = require("./classes/LayeredNoise");
const Cell = require("./classes/Cell");
const Grid = require("./classes/Grid");

const settings = require("../settings");

const col = scl.colors.fg;


// TODO: translate all selection menus


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
                // order of loading is very important so be careful when changing it
                dbg("PreInit", `Initializing translation module...`);
                await tr.init();
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
    dbg("InitAll", `PreInit finished, initializing the main menu`);

    // TODO:

    if(process.argv.includes("--dbg-start"))
        return controller.startNewGame(Grid.getMapSizes()[0], Grid.getMapTypes()[0]);

    return mainMenu();
}

/**
 * Shows the main menu
 */
function mainMenu()
{
    // TODO:
    let mm = new CustomSelectionMenu(tr("mainmenu", "title", settings.info.name), {
        overflow: true,
        cancelable: false
    });

    const redraw = () => {
        if(settings.menus.main.bannerEnabled)
        {
            let bannerChars = bannerSmoothPerlin(30, townlyBannerSeed, 5, false);

            if(!settings.verboseLogging)
                console.clear();
            console.log(`${bannerChars}\n`);
        }
        else if(!settings.verboseLogging)
            console.clear();
    };

    mm.onCursorMove(() => redraw());

    mm.setOptions([
        tr("mainmenu", "continue"),
        tr("mainmenu", "newgame"),
        tr("mainmenu", "settings"),
        tr("mainmenu", "about"),
        // tr("mainmenu", "plugins"),,
        tr("mainmenu", "exit"),
    ]);

    mm.onSubmit().then(res => {
        if(!settings.verboseLogging)
            console.clear();

        switch(res.option.index)
        {
            case 0: // Continue

            break;
            case 1: // New Game
                return startNewGamePrompt();
            case 2: // Settings
                return settingsMenu();
            case 3: // About
                return aboutMenu();
            case 4: // Exit
                console.log(tr("misc", "goodbye"));
                setTimeout(() => process.exit(0), 200);
            break;
        }
    });

    redraw();
    mm.open();
}

async function startNewGamePrompt()
{
    //#SECTION map preset
    let mapTypesMenu = new scl.SelectionMenu(tr("mappresetmenu", "title"), { cancelable: true });
                
    Grid.getMapTypes().forEach(mt => {
        mapTypesMenu.addOption(mt);
    });

    mapTypesMenu.open();
    let mapTypesResult = await mapTypesMenu.onSubmit();
    if(mapTypesResult.canceled)
        return mainMenu();
    let selectedPreset = mapTypesResult.option.description;


    //#SECTION map size
    let mapSizeMenu = new scl.SelectionMenu(tr("mapsizemenu", "title"), { cancelable: true });
    let allMapSizes = Grid.getMapSizes();

    allMapSizes.forEach(ms => {
        mapSizeMenu.addOption(`${ms[0]}x${ms[1]}`);
    });

    mapSizeMenu.open();
    let mapSizeResult = await mapSizeMenu.onSubmit();
    if(mapSizeResult.canceled)
        return mainMenu();
    let selectedSize = allMapSizes[mapSizeResult.option.index];


    controller.startNewGame(selectedSize, selectedPreset);
}

function settingsMenu()
{
    let sm = new scl.SelectionMenu(tr("settingsmenu", "title", settings.info.name), {
        overflow: true,
        cancelable: false
    });

    sm.setOptions([
        tr("settingsmenu", "display"),
        tr("settingsmenu", "gameplay"),
        tr("settingsmenu", "controls"),
        tr("settingsmenu", "back")
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

async function aboutMenu()
{
    console.log(`${settings.info.name} - v${settings.info.version}\n`);
    console.log(`Made by ${settings.info.author.name} - ${settings.info.author.url}`);

    console.log("\n\n");

    await scl.pause(tr("misc", "presskeyreturnmain"));

    return mainMenu();
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
