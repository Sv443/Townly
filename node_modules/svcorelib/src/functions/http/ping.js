const isEmpty = require("../isEmpty");

function ping(url, timeout)
{
    let pingTimestamp = new Date().getTime();

    if(typeof url != "string" || isEmpty(url))
        throw new Error("Wrong or empty argument provided for ping() - (expected: \"string\", got: \"" + typeof url + "\")");

    if(isEmpty(timeout) || typeof timeout != "number")
        timeout = 5000;

    let http_version = (url.match(/(http:\/\/)/gm) || url.match(/(https:\/\/)/gm))[0].replace("://", "");


    let host = "", path = "";
    try
    {
        host = url.split("://")[1].split("/")[0];
        path = url.split("://")[1].split("/");
    }
    catch(err)
    {
        throw new Error("URL is formatted incorrectly");
    }


    if(isEmpty(path[1]))
        path = "/";
    else {
        path.shift();
        path = path.join("/");
    }

    let http;

    if(http_version == "https")
        http = require("https");
    else http = require("http");

    return new Promise((resolve, reject) => {
        try {
            http.get({
                host: host,
                path: path,
                timeout: timeout
            }, res => {
                let measuredTime = (new Date().getTime() - pingTimestamp).toFixed(0);
                res.on('data', () => {});
                res.on('end', () => {
                    return resolve({
                        "statusCode": parseInt(res.statusCode),
                        "statusMessage": res.statusMessage,
                        "responseTime": parseInt(measuredTime),
                        "contentType": res.headers["content-type"]
                    });
                });
            });
        }
        catch(err) {
            return reject(err);
        }
    });
}
module.exports = ping;
