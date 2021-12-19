function allEqual(array, loose)
{
    if(!Array.isArray(array))
        throw new Error(`Wrong argument provided for scl.allEqual() - (expected: "Object", got: "${typeof array}")`);

    if(loose === true)
        return array.every(v => v == array[0]);

    return array.every(v => v === array[0]);
}

module.exports = allEqual;
