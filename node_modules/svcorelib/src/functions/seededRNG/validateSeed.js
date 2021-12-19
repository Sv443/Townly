const isEmpty = require("../isEmpty");

function validateSeed(seed)
{
    let digitCount = null;
    
    if(typeof seed == "string")
        digitCount = parseInt(seed.length);
    else if(seed != null)
        digitCount = parseInt(seed.toString().length);

    if(isEmpty(seed) || isEmpty(digitCount) || isNaN(parseInt(digitCount)))
        throw new Error(`Invalid argument provided for validateSeed() - make sure it is not empty / null / undefined and is of the correct type.\nExpected: "number" or "string", got: "${typeof seed}"`);

    seed = seed.toString();

    let regex = new RegExp(`^[0-9]{${digitCount}}`, "gm");

    if(!seed.match(regex) || seed.match(/\n/gm))
        return false;

    return true;
}

module.exports = validateSeed;
