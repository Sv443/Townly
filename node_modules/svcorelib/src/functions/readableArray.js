const isEmpty = require("./isEmpty");


function readableArray(array, separators, lastSeparator)
{
    if(isEmpty(array) || typeof array != "object" || (!isEmpty(separators) && typeof separators != "string" && typeof separators != "boolean") || (!isEmpty(lastSeparator) && typeof lastSeparator != "string" && typeof lastSeparator != "boolean"))
        throw new Error(`Wrong or missing parameters in "scl.readableArray()"`);
    if(isEmptyWithoutString(lastSeparator) || lastSeparator === false)
        lastSeparator = " and ";
    if(isEmptyWithoutString(separators))
        separators = ", ";

    if(array.length == null || array.length <= 0)
        return array;
    else if(array.length == 1)
        return array[0].toString();
    else if(array.length == 2)
        return array.join(lastSeparator);
    else {
        let ae = lastSeparator + array[array.length - 1];
        array.pop();
        return array.join(separators) + ae;
    }
}

function isEmptyWithoutString(variable) {
    if(variable == null || variable == undefined || variable == [])
        return true;
    else return false;
}

module.exports = readableArray;
