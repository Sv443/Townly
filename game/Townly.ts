import { colors, readableArray } from "svcorelib";
import { DeepPartial, Undefinable } from "tsdef";
import prompt from "prompts";

import { dbg, Size } from "../engine/core/Base";
import * as Controller from "./Controller";
import GameLoop, { IGameLoopSettings } from "../engine/core/GameLoop";
import Grid, { IGridOptions } from "../engine/components/Grid";
import { MenuOptionOrSpacer } from "../engine/dev/gui/menus/Menu";

import MainMenu from "../engine/dev/gui/menus/MainMenu";
import SelectionMenu from "../engine/dev/gui/menus/SelectionMenu";
import GameSettings from "./GameSettings";
import { SaveStateInfo } from "./TownlySaves";

import { tengSettings } from "../engine/settings";
import { gameSettings, generalSettings } from "../settings";

const col = colors.fg;


const mainMenu = new MainMenu("Townly", undefined, "Standard");

let settingsMenu: Undefinable<GameSettings>;


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
            dbg("Init", "Initialized Controller", "success");

            await mainMenu.preload();
            dbg("Init", `Preloaded MainMenu as "${mainMenu.toString()}"`, "success");

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
    //#SECTION PreInit
    let initPhaseName = "PreInit";
    dbg("InitAll", `Initializing ${generalSettings.info.name} v${generalSettings.info.versionStr}...`);

    try
    {
        await preInit();

        //#SECTION Init

        initPhaseName = "Init";
        await init();

        dbg("InitAll", `Successfully initialized ${generalSettings.info.name}`, "success");
        


        dbg("InitAll", `Showing MainMenu...:`, "info");
        
        const mainMenuOpts: MenuOptionOrSpacer[] = [
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
    }
    catch(err)
    {
        dbg("InitAll", `Error in ${initPhaseName}-Phase: ${err}`, "fatal");
    }
}

/**
 * Function that's eventually called by both "New Game" and "Continue" options to create the game loop and start rendering the main Grid instance
 */
function enterGame()
{
    dbg("EnterGame", `Entering game...`, "info");
    const gameLoopSettings: Partial<IGameLoopSettings> = {
        desyncEventThreshold: 25
    };

    const loop = new GameLoop(10, gameLoopSettings);

    dbg("EnterGame", `Instantiated GameLoop as "${loop.toString()}"`, "success");

    loop.on("tick", (tickNum) => {
        console.log(`#DEBUG - Tick #${tickNum}`);
    });

    loop.on("desync", (target, actual) => {
        console.log(`#DEBUG !! Desync: ${actual} of target ${target}`);
    });

    dbg("EnterGame", `Registered GameLoop events`, "success");
    
    
    const gridSize = new Size(100, 50);
    const chunkSize = new Size(100, 50);
    const gridOpts: DeepPartial<IGridOptions> = {
        inputEnabled: false,
        inputStream: process.stdin
    };

    dbg("EnterGame", `Creating main grid instance (grid size = ${gridSize.toString()} - chunk size = ${chunkSize.toString()})...`, "info");

    const grid = new Grid(gridSize, chunkSize, undefined, gridOpts);

    dbg("EnterGame", `Created main grid instance as "${grid.toString()}"`, "success");
}

/**
 * Opens the main menu
 */
async function openMainMenu()
{
    mainMenu.show();

    mainMenu.on("submit", async (result) => {
        dbg("InitAll", `Selected MainMenu option "${result.option.text}" #${result.option.index}`, "info");


        // mainMenu.removeAllListeners();
        // mainMenu.removeAllListeners("submit");

        // no fallthroughs
        switch(result.option.index)
        {
            case 0:
            {
                // New Game

                // prompt the user and create a save game
                const saveGame = await createSaveGame();

                // setInterval(() => {}, 1000);

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

                dbg("MainMenu", `Invalid option #${result.option.index} selected`, "error");
                throw new Error(`Invalid MainMenu option #${result.option.index} selected`);
        }
    });
}

/**
 * Runs a few prompts and creates a save game with them
 */
function createSaveGame(): Promise<SaveStateInfo>
{
    return new Promise(async (res, rej) => {
        const saveState: Partial<SaveStateInfo> = {};

        // TODO: keys are displayed twice for some stupid reason

        //#SECTION Name of Town
        const namePrompt = await prompt({
            type: "text",
            name: "name",
            message: "What should your town be called?"
        });

        saveState.name = namePrompt.name;


        //#SECTION Size of Town
        const sizePrompt = await prompt({
            type: "select",
            name: "size",
            choices: [
                {
                    title: "80 x 20",
                    value: new Size(80, 20)
                },
                {
                    title: "150 x 50",
                    value: new Size(150, 50)
                }
            ],
            message: "How big should your town's area be?  [width x height]"
        });

        saveState.gridSize = (sizePrompt.size as Size);


        return res(saveState as SaveStateInfo);
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
    dbg("Shutdown", `Shutting down ${generalSettings.info.name}...`, "info");
    console.log(`\n\nGoodbye.\n`);

    setImmediate(() => process.exit(0));
}


// Start Townly when this file is executed
initAll();
