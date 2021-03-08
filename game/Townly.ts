import { gameSettings, generalSettings } from "../settings";

import { colors, unused, pause } from "svcorelib";

import { dbg } from "../engine/base/Base";



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

        dbg("InitAll", `Successfully initialized ${generalSettings.info.name}`, "success");

        console.log(`${colors.fg.green}Started ${generalSettings.info.name} v${generalSettings.info.versionStr}${colors.rst}`);
    }
    catch(err)
    {
        dbg("InitAll", `Error while initializing: ${err}`, "fatal");
    }
}


function softShutdown()
{
    console.log(`\n\nGoodbye.\n`);
}


initAll();