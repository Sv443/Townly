const isEmpty = require("../isEmpty");
const replaceAt = require("../replaceAt");
const randRange = require("../randRange");

function decimal(uuidFormat)
{
    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "0123456789";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in scl.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    return result;
}

module.exports = decimal;
