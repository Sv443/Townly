function isEmpty(input)
{
    return (
           (input === undefined || input === null || input === "") // other
        || (typeof input === "object" && Array.isArray(input) && input.length === 0) // arrays
        || (typeof input === "object" && !Array.isArray(input) && Object.keys(input) && Object.keys(input).length == 0) // objects
    ) ? true : false;
}

module.exports = isEmpty;
