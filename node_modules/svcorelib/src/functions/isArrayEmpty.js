const isEmpty = require("./isEmpty");

function isArrayEmpty(array)
{
    if((array === "" || array == null) || typeof array != "object")
        throw new Error(`Wrong or empty arguments provided for scl.isArrayEmpty() - (expected: "object", got: "${typeof array}")`);

    let emptiness = 0;
    array.forEach(item => {
        if(isEmpty(item))
            emptiness++;
    });

    if(emptiness == array.length)
        return true;
    else if(emptiness == 0)
        return false;
    else return emptiness;
}

module.exports = isArrayEmpty;
