const unused = require("../unused");


function softShutdown(funct, code)
{
    code = parseInt(code);

    if(isNaN(code) || code < 0)
        code = 0;

    const onbeforeshutdown = () => {
        if(process.scl.noShutdown)
            return;

        if(typeof funct == "function")
        {
            funct();
            process.exit(code);
        }
        else if(funct instanceof Promise)
        {
            funct().then(() => {
                process.exit(code);
            }).catch((e) => unused(e));
        }
    };
    
    process.on("SIGINT", onbeforeshutdown);
    process.on("SIGTERM", onbeforeshutdown);
}

module.exports = softShutdown;
