const randRange = require("./randRange");

function randomItem(array)
{
    if(!Array.isArray(array))
        throw new Error("Parameter is not an array");
    
    if(array.length <= 0)
        throw new Error("Array doesn't contain any items");

    return array[randRange(0, array.length - 1)];
}

module.exports = randomItem;
