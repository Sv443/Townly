const minimatch = require("minimatch");
const fs = require("fs-extra");
const { resolve, join, basename } = require("path");
const crypto = require("crypto");
const diff = require("deep-diff");

const reserialize = require("../functions/reserialize");
const readdirRecursive = require("../functions/filesystem/readdirRecursive");
const allOfType = require("../functions/allOfType");

const { InvalidPathError, NotAFolderError, PatternInvalidError } = require("./Errors");



// FolderDaemonOptions {
//     whitelist?: string[];
//     blacklist?: string[];
//     recursive?: boolean;
//     updateInterval?: number;
// }

class FolderDaemon
{
    constructor(dirPath, options)
    {
        // TODO: parse options object
        if(typeof options !== "object")
        {
            this.options = {
                whitelist: [],
                blacklist: [],
                recursive: false,
                updateInterval: 500
            };
        }
        else
        {
            if(options.whitelist != undefined && (!Array.isArray(options.whitelist) || !allOfType(options.whitelist, "string")))
                throw new PatternInvalidError(`Whitelist glob pattern parameter was provided but is not an array containing strings`);

            if(options.blacklist != undefined && (!Array.isArray(options.blacklist) || !allOfType(options.blacklist, "string")))
                throw new PatternInvalidError(`Blacklist glob pattern parameter was provided but is not an array containing strings`);

            this.options = {
                whitelist: options.whitelist || [],
                blacklist: options.blacklist || [],
                recursive: typeof options.recursive === "boolean" ? options.recursive : false ,
                updateInterval: typeof options.updateInterval === "number" ? parseInt(options.updateInterval) : 500
            };
        }

        if(this.options.blacklist.length > 0 && this.options.whitelist.length > 0)
            throw new TypeError(`Invalid option parameters: Can't use a whitelist and blacklist at the same time.`);

        if((!this.options.updateInterval && this.options.updateInterval !== 0) || isNaN(this.options.updateInterval))
            this.options.updateInterval = 500;


        try
        {
            let dPath = resolve(dirPath);

            if(!fs.pathExistsSync)
                throw new InvalidPathError(`Path "${dPath}" is invalid or couldn't be resolved`);

            if(!fs.statSync(dPath).isDirectory())
                throw new NotAFolderError(`Path "${dPath}" is not a directory`);

            this._dirPath = dPath;
        }
        catch(err)
        {
            throw new InvalidPathError(`Path "${dirPath}" is invalid or couldn't be resolved`);
        }

        this._callbackAttached = false;
        this._callbackFn = () => {};

        this._lastHashes = {};
        this._currentHashes = {};

        if(this.options.updateInterval > 0)
        {
            this._interval = setInterval(() => this.intervalCall(), this.options.updateInterval);
            this.intervalCall();
        }

        return this;
    }

    onChanged(callback_fn)
    {
        if(typeof callback_fn == "function")
            this._callbackFn = callback_fn;

        return new Promise((res, rej) => {
            this._promiseResolve = res;
            this._promiseReject = rej;
        });
    }

    removeCallbacks()
    {
        this._callbackFn = () => {};
        this._promiseResolve = () => {};
        this._promiseReject = () => {};
    }

    intervalCall()
    {
        this.scanDir().then(files => {
            if(Array.isArray(files))
            {
                let promises = [];

                let hashFile = (filePath) => {
                    return new Promise((hashResolve) => {
                        if(!fs.statSync(filePath).isFile())
                            return hashResolve(null);
                        
                        fs.stat(filePath, (err, stats) => {
                            if(err)
                                return hashResolve(null);

                            if(stats.size == 0)
                            {
                                return hashResolve({
                                    path: filePath,
                                    hash: "FILE_EMPTY"
                                });
                            }

                            let fileStream = fs.createReadStream(filePath);
                            let hash = crypto.createHash("sha1");
                            
                            hash.setEncoding("hex");

                            fileStream.on("end", () => {
                                if(hash)
                                {
                                    hash.end();

                                    let hashStr = hash.read();

                                    return hashResolve({
                                        path: filePath,
                                        hash: hashStr
                                    });
                                }
                                else
                                    return hashResolve(null);
                            });

                            fileStream.pipe(hash);
                        });
                    });
                }

                files.forEach(file => {
                    let filePath = !this.options.recursive ? join(this._dirPath, file) : file;

                    if(this.options.blacklist.length > 0)
                    {
                        // if blacklist is set
                        this.options.blacklist.forEach(pattern => {
                            let match = minimatch(basename(file), pattern);
                            if(match) // if file matches pattern, it is blacklisted
                                return;

                            promises.push(hashFile(filePath));
                            return;
                        });
                    }
                    else if(this.options.whitelist.length > 0)
                    {
                        // if whitelist is set
                        this.options.whitelist.forEach(pattern => {
                            let match = minimatch(basename(file), pattern);
                            if(match) // if file matches pattern, it is whitelisted
                                promises.push(hashFile(filePath));

                            return;
                        });
                    }
                    else // if no lists are set, every file is whitelisted
                        promises.push(hashFile(filePath));
                });

                Promise.all(promises).then(results => {
                    this._currentHashes = {};

                    results.forEach(result => {
                        if(typeof result == "object" && result != null)
                            this._currentHashes[result.path] = result.hash;
                    });

                    if(Object.keys(this._lastHashes).length == 0)
                        this._lastHashes = reserialize(this._currentHashes);

                    let deepDiff = diff(this._lastHashes, this._currentHashes);

                    if(Array.isArray(deepDiff) && deepDiff.length > 0)
                    {
                        // files have changed
                        let changedFiles = deepDiff.map(match => match.path[0]);

                        this._callbackFn(null, changedFiles);
                        this._promiseResolve(changedFiles);
                    }

                    this._lastHashes = reserialize(this._currentHashes);
                }).catch(err => {
                    return this._promiseReject(`Error while scanning through directory: ${err}`);
                });
            }
        }).catch(err => {
            this._callbackFn(err);
            this._promiseReject(err);
        });
    }

    /**
     * ❌ Private method - don't use ❌
     * @private
     * @returns {Promise<Array<String>>}
     */
    scanDir()
    {
        return new Promise((res, rej) => {
            if(!this.options.recursive)
            {
                fs.readdir(resolve(this._dirPath), (err, files) => {
                    if(!err)
                        return res(files);
                    else
                        return rej(err);
                });
            }
            else
            {
                readdirRecursive(resolve(this._dirPath)).then(results => {
                    return res(results);
                }).catch(err => {
                    return rej(err);
                })
            }
        });
    }
}

module.exports = FolderDaemon;
