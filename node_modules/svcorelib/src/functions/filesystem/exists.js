const fs = require("fs-extra");
const { resolve } = require("path");


function exists(path)
{
    path = resolve(path);

    return new Promise((pRes) => {
        fs.access(path).then(() => {
            return pRes(true);
        }).catch(() => {
            return pRes(false);
        });
    });
}

module.exports = exists;
