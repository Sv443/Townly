const fs = require("fs-extra");
const http = require("http");
const { resolve } = require("path");
require("../unused")(http);

const { InvalidMimeTypeError } = require("../../classes/Errors");


function pipeFile(res, filePath, mimeType = "text/plain", statusCode = 200)
{
    try
    {
        statusCode = parseInt(statusCode);
        if(isNaN(statusCode))
            statusCode = 200;
    }
    catch(err)
    {
        return "Encountered internal server error while piping file: wrong type for status code.";
    }

    if(!res || !(res instanceof http.ServerResponse))
        return "Error: parameter \"res\" is empty or not of type http.ServerResponse - make sure you have used \"res\", not \"req\"!";

    if(!mimeType)
        mimeType = "text/plain";
    
    if(typeof mimeType != "string")
        return "Parameter \"mimeType\" was provided but is not of type string";

    if(!mimeType.match(/\w+\/[-+.\w]+/g))
        throw new InvalidMimeTypeError(`The specified parameter "mimeType" doesn't contain a valid MIME type`);

    filePath = resolve(filePath);

    if(!fs.existsSync(filePath))
        return `File at "${filePath}" not found.`;

    try
    {
        if(!res.headersSent)
        {
            res.writeHead(statusCode, {
                "Content-Type": `${mimeType}; charset=UTF-8`,
                "Content-Length": fs.statSync(filePath).size
            });
        }

        let readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

        return null;
    }
    catch(err)
    {
        return err;
    }
}

module.exports = pipeFile;
