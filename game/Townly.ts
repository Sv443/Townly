import { gameSettings, generalSettings } from "../settings";

import { colors, unused, pause } from "svcorelib";

import { dbg, LogLevel } from "../engine/base/Base";
import * as Controller from "./Controller";
import { GameLoop, IGameLoopSettings } from "../engine/base/GameLoop";


function preInit()
{
    return new Promise<void>(async (res, rej) => {
        unused(rej);

        // register soft shutdown signals
        gameSettings.init.softShutdownSignals.forEach(sig => process.on(sig, softShutdown));

        dbg("PreInit", "Entering PreInit phase...");

        return res();
    });
}

function init()
{
    return new Promise<void>(async (res, rej) => {
        unused(rej);

        dbg("Init", "Entering Init phase...");

        await Controller.init();

        return res();
    });
}

async function initAll()
{
    dbg("InitAll", `Initializing ${generalSettings.info.name}...`);

    try
    {
        await preInit();

        await init();

        dbg("InitAll", `Successfully initialized ${generalSettings.info.name}`, LogLevel.Success);

        console.log(`${colors.fg.green}Started ${generalSettings.info.name} v${generalSettings.info.versionStr}${colors.rst}`);



        const gameLoopSettings: Partial<IGameLoopSettings> = {
            desyncEventThreshold: 25
        };

        const loop = new GameLoop(10, gameLoopSettings);

        loop.on("tick", (tickNum) => {
            console.log(`#DEBUG - Tick #${tickNum}`);
        });

        loop.on("desync", (target, actual) => {
            console.log(`#DEBUG !! Desync: ${actual} of target ${target}`);
        });
    }
    catch(err)
    {
        dbg("InitAll", `Error while initializing: ${err}`, LogLevel.Fatal);
    }
}

/**
 * Synchronous function that is called when the process is exited
 */
function softShutdown()
{
    console.log(`\n\nGoodbye.\n`);

    process.exit(0);
}


initAll();
