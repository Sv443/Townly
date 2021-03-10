import { gameSettings, generalSettings } from "../settings";

import { colors, unused, pause } from "svcorelib";

import { dbg, LogLevel } from "../engine/base/Base";



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

        setInterval(() => {
            console.log(`#DEBUG: Tick`);
        }, 1000);
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
