const { ensureDirSync } = require("fs-extra");
const { resolve } = require("path");
const allOfType = require("../allOfType");


function ensureDirsSync(directories)
{
    if(!Array.isArray(directories) || !allOfType(directories, "string"))
        throw new TypeError(`Passed directories are not an array of strings`);

    directories = directories.map(dir => resolve(dir));

    directories.forEach(dir => ensureDirSync(dir));
}

module.exports = ensureDirsSync;
