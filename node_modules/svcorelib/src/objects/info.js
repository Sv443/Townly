const packageJSON = require("../../package.json");

const jslInfo = {
    version: packageJSON.version,
    intVersion: packageJSON.version.split(".").map(v => v = parseInt(v)),
    name: "SvCoreLib",
    desc: packageJSON.description,
    author: packageJSON.author.name,
    authorLong: `${packageJSON.author.name} <${packageJSON.author.email}> (${packageJSON.author.url})`,
    contributors: packageJSON.contributors != undefined ? packageJSON.contributors : [],
    license: `${packageJSON.license} (https://sv443.net/LICENSE)`,
    documentation: "https://github.com/Sv443-Network/SvCoreLib/blob/master/docs.md"
};

module.exports = jslInfo;
