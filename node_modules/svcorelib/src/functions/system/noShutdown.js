function noShutdown()
{
    if(process.scl != undefined && process.scl.noShutdown)
        return;

    if(process.scl == undefined)
        process.scl = {};
    
    process.scl.noShutdown = true;
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
}

module.exports = noShutdown;
