const replaceAt = require("../replaceAt");
const randRange = require("../randRange");

function binary(uuidFormat, asBooleanArray)
{    
    if(typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in scl.generateUUID.binary() - (expected: "String", got: "${typeof uuidFormat}")`);

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "01";
    possible = possible.split("");

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");

    if(asBooleanArray === true)
    {
        let boolResult = [];
        result.split("").forEach(char => {
            if(char == "0")
                boolResult.push(false);
            else if(char == "1")
                boolResult.push(true);
        });

        return boolResult;
    }

    return result;
}

module.exports = binary;
