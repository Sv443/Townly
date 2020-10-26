const fs = require("fs-extra");
const scl = require("svcorelib");
const { resolve, join } = require("path");


let plugins = [];

function loadPlugins()
{
    let pluginFolder = resolve("./plugins");

    fs.readdirSync(pluginFolder).forEach(p => {
        let pluginPath = join(pluginFolder, p);
        let stat = fs.statSync(pluginPath);

        if(p.endsWith(".js") && stat.isFile())
        {
            console.log(`Loading plugin file ${p}...`);

            let plugin = require(pluginPath);

            plugins.push({
                manifest: plugin.manifest || {},
                onInit: plugin.onInit || (() => {}),
                upd1: plugin.upd1 || (() => {})
            });
        }
    });
}

async function init()
{
    loadPlugins();

    console.log(`Plugins: ${plugins.length}`);

    let chk = scl.randRange(0, 9);

    console.log(`IDX_INIT CHK: ${chk}`);

    plugins.forEach(plugin => {
        console.log(`Calling onInit on plugin ${plugin.manifest.name}`);
        let bar = plugin.onInit({ chk });
        console.log(`BAR: ${bar}`);
    });

    await scl.pause();

    plugins.forEach(plugin => {
        console.log(`${plugin.manifest.name} - BAR: ${plugin.upd1()}`);
    });

    await scl.pause();
}

init();