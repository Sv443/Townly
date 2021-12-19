const { url } = require("inspector");
const unused = require("../unused");

function inDebugger(checkArg)
{
    try
    {
        if(typeof checkArg === "string" && checkArg.length > 0)
            return process.argv.join(" ").includes(checkArg);
    }
    catch(err)
    {
        unused(err);
    }

    return (
        typeof v8debug === "object"
        || /--debug|--inspect/.test(process.execArgv.join(" "))
        || typeof url() === "string"
    );
}

module.exports = inDebugger;
