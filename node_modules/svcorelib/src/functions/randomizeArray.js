const randRange = require("./randRange");

function randomizeArray(array)
{
    let retArray = new Array(...array); // has to be done so array and retArray don't point to the same memory address

    if(isNaN(parseInt(array.length)))
        throw new Error(`Parameter in "scl.randomizeArray()" needs to be an array that has to contain at least one item.`);

    // shamelessly stolen from https://javascript.info/task/shuffle
    for(let i = retArray.length - 1; i > 0; i--)
    {
        let j = Math.floor((randRange(0, 10000) / 10000) * (i + 1));
        [retArray[i], retArray[j]] = [retArray[j], retArray[i]];
    }

    return retArray;
}

module.exports = randomizeArray;
