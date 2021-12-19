const { ensureDir } = require("fs-extra");
const { resolve } = require("path");
const allOfType = require("../allOfType");


function ensureDirs(directories)
{
    return new Promise((res, rej) => {
        if(!Array.isArray(directories) || !allOfType(directories, "string"))
            throw new TypeError(`Passed directories are not an array of strings`);

        directories = directories.map(dir => resolve(dir));

        const promises = [];

        directories.forEach(dir => promises.push(ensureDir(dir)));

        Promise.all(promises).then(() => {
            return res();
        }).catch(err => {
            return rej(err);
        });
    });
}

module.exports = ensureDirs;
