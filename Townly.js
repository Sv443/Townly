/**
 * @name Townly
 * @description A CLI city building game
 * @version 0.1.0
 * @author Sv443
 */

// Execute or Require this file to run Townly


const main = require("./src/main");

const settings = require("./settings");

function runStandalone()
{
    console.log(`Starting ${settings.info.name} v${settings.info.version}\n`);
    main.initAll();
}
runStandalone();
