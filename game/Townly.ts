import { generalSettings } from "../settings";

import { colors, unused, pause } from "svcorelib";

import { dbg } from "../engine/base/Base";



function preInit()
{
    return new Promise<void>(async (pRes, pRej) => {
        unused(pRej);

        dbg("PreInit", "Entering PreInit phase...");

        return pRes();
    });
}

function init()
{
    return new Promise<void>(async (pRes, pRej) => {
        unused(pRej);

        dbg("Init", "Entering Init phase...");

        return pRes();
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



initAll();