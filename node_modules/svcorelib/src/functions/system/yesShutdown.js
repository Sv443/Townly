function yesShutdown()
{
    if(process.scl != undefined && !process.scl.noShutdown)
        return;

    if(process.scl == undefined)
        process.scl = {};

    process.scl.noShutdown = false;
    process.on("SIGINT", ()=>process.exit());
    process.on("SIGTERM", ()=>process.exit());
}

module.exports = yesShutdown;
