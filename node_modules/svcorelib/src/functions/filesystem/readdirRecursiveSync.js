const fs = require("fs-extra");
const path = require("path");

function readdirRecursiveSync(folder)
{
    // from https://stackoverflow.com/a/16684530/8602926
    let walk = function(dir) {
        let results = [];
        let list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory())
                results = results.concat(walk(file));
            else
                results.push(path.resolve(file));
        });
        return results;
    }
    return walk(folder);
}

module.exports = readdirRecursiveSync;
