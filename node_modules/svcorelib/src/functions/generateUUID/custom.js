const isEmpty = require("../isEmpty");
const replaceAt = require("../replaceAt");
const randRange = require("../randRange");
const allOfType = require("../allOfType");

function custom(uuidFormat, possibleValues)
{
    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ").replace(/\^y/gm, "ꮧ");

    // string overload is deprecated since v1.14.0

    if(Array.isArray(possibleValues) && !allOfType(possibleValues, "string"))
        possibleValues = possibleValues.map(v => v.toString());

    const possible = Array.isArray(possibleValues) ? possibleValues : possibleValues.toString().split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new TypeError(`Wrong parameter provided for "uuidFormat" in scl.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    const regex = /[xy]/gm;
    let match;
    const matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    return result;
}

module.exports = custom;
