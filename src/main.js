const scl = require("svcorelib");


/**
 * Async pre-initialization that gets called before anything else
 * @returns {Promise}
 */
function preInit()
{
    return new Promise((pRes, pRej) => {
        scl.unused(pRes, pRej);
        //TODO:
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
}

module.exports = { initAll };
