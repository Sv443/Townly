const fs = require("fs-extra");

function logger(path, content, options)
{
    if(typeof path != "string" || typeof content != "string")
        throw new Error("path and/or content are empty or of the wrong type");

    let timestamp = new Date().toString();

    if(options.timestamp)
        content = `[${timestamp}]  ${content}`;

    if(!options.append_bottom)
        fs.writeFileSync(path, content);
    else
        fs.appendFileSync(path, content + "\n");
}

module.exports = logger;
