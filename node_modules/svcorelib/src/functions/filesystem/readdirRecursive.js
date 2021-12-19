const fs = require("fs-extra");
const path = require("path");

function readdirRecursive(folder, callback)
{
    // refactored version of https://stackoverflow.com/a/5827895/8602926
    return new Promise((resolve, reject) => {
        let walk = (dir, done) => {
            let results = [];
            fs.readdir(dir, (err, list) => {
                if(err)
                    return done(err);
                let pending = list.length;
                if(!pending)
                    return done(null, results.reverse());
                list.forEach(file => {
                    file = path.resolve(dir, file);
                    fs.stat(file, (err, stat) => {
                        if(stat && stat.isDirectory())
                        {
                            walk(file, (err, res) => {
                                results = results.concat(res);
                                if(!--pending)
                                    done(null, results.reverse());
                            });
                        }
                        else
                        {
                            results.push(file);
                            if(!--pending)
                                done(null, results.reverse());
                        }
                    });
                });
            });
        };
        walk(folder, (err, result) => {
            if(typeof callback == "function")
                callback(err, result);

            if(!err)
                return resolve(result);
            else return reject(err);
        });
    });
}
module.exports = readdirRecursive;
