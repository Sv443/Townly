function allOfType(array, type)
{
    let possibleTypes = [ "bigint", "boolean", "function", "number", "object", "string", "symbol", "undefined" ];

    if(!Array.isArray(array))
        throw new TypeError(`Parameter "array" needs to be an array`);

    if(!possibleTypes.includes(type))
        throw new TypeError(`Parameter "type" needs to be a string that contains a primitive JavaScript variable type`);

    return array.every(val => (typeof val === type));
}

module.exports = allOfType;
