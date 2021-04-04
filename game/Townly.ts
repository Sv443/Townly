import { gameSettings, generalSettings } from "../settings";

import { colors, pause, readableArray } from "svcorelib";
import { DeepPartial, Undefinable } from "tsdef";

import { dbg, LogLevel, Size } from "../engine/base/Base";
import * as Controller from "./Controller";
import { GameLoop, IGameLoopSettings } from "../engine/base/GameLoop";
import { Grid, IGridOptions } from "../engine/components/Grid";
import { Menu, MenuOption } from "../engine/display/ui/menus/Menu";

import MainMenu from "../engine/display/ui/menus/MainMenu";
import SettingsMenu from "../engine/display/ui/menus/SettingsMenu";
import { SelectionMenu } from "../engine/display/ui/menus/SelectionMenu";
import { tengSettings } from "../engine/settings";
import { GameSettings } from "./GameSettings";

const col = colors.fg;


const mainMenu = new MainMenu("Townly", undefined, "Standard");

var settingsMenu: Undefinable<GameSettings>;


function preInit()
{
    return new Promise<void>(async (res, rej) => {
        try
        {
            dbg("PreInit", "Entering PreInit phase...");

            // register soft shutdown signals
            gameSettings.init.softShutdownSignals.forEach(sig => process.on(sig, softShutdown));

            dbg("PreInit", `Hooking shutdown signals: ${readableArray(gameSettings.init.softShutdownSignals, ", ", " & ")}`);

            return res();
        }
        catch(err)
        {
            return rej(err);
        }
    });
}

function init()
{
    return new Promise<void>(async (res, rej) => {
        try
        {
            dbg("Init", "Entering Init phase...");
            
            await Controller.init();
            dbg("Init", "Initialized Controller", LogLevel.Success);

            await mainMenu.preload();
            dbg("Init", `Preloaded MainMenu as "${mainMenu.toString()}"`, LogLevel.Success);

            return res();
        }
        catch(err)
        {
            return rej(err);
        }
    });
}

async function initAll()
{
    let initPhaseName = "PreInit";
    dbg("InitAll", `Initializing ${generalSettings.info.name} v${generalSettings.info.versionStr}...`);

    try
    {
        await preInit();

        initPhaseName = "Init";
        await init();

        dbg("InitAll", `Successfully initialized ${generalSettings.info.name}`, LogLevel.Success);
        


        dbg("InitAll", `Showing MainMenu...:`, LogLevel.Info);
        
        const mainMenuOpts: MenuOption[] = [
            "New Game", // 0
            "Continue", // 1
            null,       // 2
            "Settings", // 3
            "About",    // 4
            null,       // 5
            "Exit"      // 6
        ];

        mainMenu.setOptions(mainMenuOpts);

        openMainMenu();

        // enterGame(); // TODO: only call this when appropriate
    }
    catch(err)
    {
        dbg("InitAll", `Error in ${initPhaseName}-Phase: ${err}`, LogLevel.Fatal);
    }
}

/**
 * Function that's eventually called by both "New Game" and "Continue" options to render the main Grid instance
 */
function enterGame()
{
    dbg("EnterGame", `Entering game...`, LogLevel.Info);
    const gameLoopSettings: Partial<IGameLoopSettings> = {
        desyncEventThreshold: 25
    };

    const loop = new GameLoop(10, gameLoopSettings);

    dbg("EnterGame", `Instantiated GameLoop as "${loop.toString()}"`, LogLevel.Success);

    loop.on("tick", (tickNum) => {
        console.log(`#DEBUG - Tick #${tickNum}`);
    });

    loop.on("desync", (target, actual) => {
        console.log(`#DEBUG !! Desync: ${actual} of target ${target}`);
    });

    dbg("EnterGame", `Registered GameLoop events`, LogLevel.Success);
    
    
    const gridSize = new Size(100, 50);
    const chunkSize = new Size(100, 50);
    const gridOpts: DeepPartial<IGridOptions> = {
        inputEnabled: false,
        inputStream: process.stdin
    };

    dbg("EnterGame", `Creating main grid instance (grid size = ${gridSize.toString()} - chunk size = ${chunkSize.toString()})...`, LogLevel.Info);

    const grid = new Grid(gridSize, chunkSize, undefined, gridOpts);

    dbg("EnterGame", `Created main grid instance as "${grid.toString()}"`, LogLevel.Success);
}

/**
 * Opens the main menu
 */
async function openMainMenu()
{
    mainMenu.show();

    mainMenu.on("submit", result => {
        dbg("InitAll", `Selected MainMenu option "${result.option.text}" #${result.option.index}`, LogLevel.Info);

        switch(result.option.index)
        {
            case 0:
            {
                // New Game

                // // create a new save game
                // const saveGame = await createSaveGame();

                // // load the new save game
                // const saveData = await loadSaveGame(saveGame);

                // // actually enter the game
                // enterGame(saveData);
                console.log(`\n\n${col.red}WIP - Please restart the app${col.rst}\n`);

                break;
            }
            case 1:
            {
                // Continue

                // // let user select save game
                // const saveGame = await selectSaveGame();

                // // load the save game
                // const saveData = await loadSaveGame(saveGame);

                // // actually enter the game
                // enterGame(saveData);
                console.log(`\n\n${col.red}WIP - Please restart the app${col.rst}\n`);

                break;
            }
            case 3:
            {
                // Settings

                openSettingsMenu();
            }
            break;
            case 4:
                // About

                openAboutPrompt();
            break;
            case 6:
                // Exit

                // shut down
                softShutdown();
            break;
            default:
                // invalid option or spacer was somehow selected

                dbg("MainMenu", `Invalid option #${result.option.index} selected`, LogLevel.Error);
                throw new Error(`Invalid MainMenu option #${result.option.index} selected`);
        }
    });
}

/**
 * Opens the game settings menu
 */
async function openSettingsMenu()
{
    if(!(settingsMenu instanceof GameSettings))
    {
        // instance of the GameSettings menu doesn't exist yet

        settingsMenu = new GameSettings();
    }


    if(settingsMenu && !settingsMenu.isPreloaded())
    {
        // instance exists or was created, but the menu isn't preloaded yet

        await settingsMenu.preload();
    }

    settingsMenu.on("canceled", () => {
        (settingsMenu as GameSettings).hide();

        openMainMenu();
    });

    settingsMenu.show();
}

/**
 * Opens the about prompt
 */
async function openAboutPrompt()
{
    SelectionMenu.clearConsole();

    const lines = [
        `${generalSettings.info.name} v${generalSettings.info.versionStr} [${generalSettings.info.versionRangeName}-${generalSettings.info.buildNbr}]`,
        `Powered by Teng Engine v${tengSettings.info.versionStr} - ${tengSettings.info.homepage}`,
        ``,
        ``,
        `${generalSettings.info.name} is a city building game that runs entirely in the command line.`,
        ``,
        `Can't spend seven kidneys on that new graphics card?`,
        `We've got you covered, because you technically don't even need an integrated GPU to run this game!`,
        ``,
        `Wanna play from everywhere around the world?`,
        `Whip out your terminal and SSH into your PC to play a bit of Townly - no need for a crunchy looking video stream!`,
        ``,
        `Inspired by TheoTown and Cities: Skylines, this game at least attempts to be a full fledged city builder.`,
    ];

    process.stdout.write(`${lines.join("\n")}\n\n\n\n\n`);

    // await pause("Press any key to go back to the main menu...");


    // SelectionMenu.clearConsole();

    // TODO: main menu is unresponsive
    // openMainMenu();

    console.log(`${col.yellow}WIP - Please restart the app${col.rst}\n`);
}

/**
 * Synchronous function that is called when the process is exited
 */
function softShutdown()
{
    dbg("Shutdown", `Shutting down ${generalSettings.info.name}...`, LogLevel.Info);
    console.log(`\n\nGoodbye.\n`);

    setImmediate(() => process.exit(0));
}


initAll();
