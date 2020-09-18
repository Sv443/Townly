const Foo = require("./lib/Foo");


const manifest = {
    name: "Example Plugin",
    version: "0.1.0",
    author: {
        name: "Sv443",
        url: "https://github.com/Sv443",
        email: "contact@sv443.net"
    },
    compatibility: "1.0.0"
};


var foo = new Foo();

/**
 * Gets called when the plugin is initialized
 * @param {Object} data
 * @returns {String}
 */
function onInit(data)
{
    console.log(`X_INIT - CHK: ${data.chk}`);

    return foo.getBar();
}

/**
 * @returns {String}
 */
function upd1()
{
    foo.setBar("X_NEWBAR");
    console.log("X_UPD1");

    return foo.getBar();
}

module.exports = { manifest, onInit, upd1 };
