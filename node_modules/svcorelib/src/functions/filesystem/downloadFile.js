const isEmpty = require("../isEmpty");
const fs = require("fs-extra");
const https = require("https");

function downloadFile(url, destPath = "./", options)
{
    if(isEmpty(options))
        options = {
            fileName: "download.txt",
            progressCallback: () => {},
            finishedCallback: () => {}
        }
    else
    {
        if(isEmpty(options.fileName)) options.fileName = "download.txt";
        if(isEmpty(options.progressCallback)) options.progressCallback = () => {};
        if(isEmpty(options.finishedCallback)) options.finishedCallback = () => {};
    }

    let lastM = false;

    return new Promise((resolve, reject) => {
        let dest = `${destPath}${destPath.endsWith("/") ? "" : "/"}${options.fileName}`;
        if(!fs.existsSync(destPath))
        {
            let err = `Error in scl.downloadFile() - The directory at the path "${destPath}" doesn't exist. Please make sure the directory exists and try again.`;
            reject(err);
            throw new Error(err);
        }

        let urlCl = new URL(url);
        let opts = {
            hostname: urlCl.hostname,
            port: urlCl.protocol === "https:" || urlCl.protocol.includes("https") ? 443 : 80,
            path: urlCl.pathname,
            method: "HEAD"
        };

        let file = fs.createWriteStream(dest);
    
        let req2 = https.request(opts, res2 => {
            if(res2.statusCode >= 300 && res2.statusCode < 400)
                return downloadFile(res2.headers["location"], destPath, options);

            if(res2.statusCode >= 400)
            {
                let err = "Status Code: " + res2.statusCode;
                options.finishedCallback(err);
                return reject(err);
            }

            let totalSize = null;
            if(!isEmpty(res2.headers) && !isEmpty(res2.headers["content-length"]))
                totalSize = parseInt(res2.headers["content-length"]);
                

            let req = https.get(url, res => {
                let sizeUpdateIv;
                if(!isEmpty(options) && !isEmpty(options.progressCallback))
                    sizeUpdateIv = setInterval(() => {
                        let curSize = fs.statSync(dest).size;
                        if(!isEmpty(totalSize))
                            options.progressCallback({
                                currentB: parseFloat(curSize),
                                currentKB: parseFloat((curSize / 1000).toFixed(3)),
                                currentMB: parseFloat((curSize / 1000000).toFixed(3)),
                                totalB: parseFloat(totalSize),
                                totalKB: parseFloat((totalSize / 1000).toFixed(3)),
                                totalMB: parseFloat((totalSize / 1000000).toFixed(3))
                            });
                        else
                            options.progressCallback({
                                currentB: curSize,
                                currentKB: parseFloat((curSize / 1000).toFixed(3)),
                                currentMB: parseFloat((curSize / 1000000).toFixed(3))
                            });
                    }, 50);
                res.pipe(file);
        
                file.on("finish", () => {
                    if(!isEmpty(options.progressCallback)) clearInterval(sizeUpdateIv);
                    if(fs.statSync(dest).size == totalSize && !lastM)
                    {
                        lastM = true;
                        if(!isEmpty(totalSize) && !isEmpty(options) && !isEmpty(options.progressCallback))
                            options.progressCallback({
                                currentB: parseFloat(totalSize),
                                currentKB: parseFloat((totalSize / 1000).toFixed(3)),
                                currentMB: parseFloat((totalSize / 1000000).toFixed(3)),
                                totalB: parseFloat(totalSize),
                                totalKB: parseFloat((totalSize / 1000).toFixed(3)),
                                totalMB: parseFloat((totalSize / 1000000).toFixed(3))
                            });
                    }
        
                    let cb = () => {
                        options.finishedCallback(null);
                        return resolve();
                    };
                    file.close(cb);
                });
            });
        
            req.on("error", err => {
                fs.unlink(dest, () => {
                    options.finishedCallback(err);
                    return reject(err);
                });
            });

            req.end();
        });

        req2.on("error", e => {
            let err = `Error while reading remote file information: ${e}`;
            reject(err);
            throw new Error(err);
        });

        req2.end();
    });
}

module.exports = downloadFile;
