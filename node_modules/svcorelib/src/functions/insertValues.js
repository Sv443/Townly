function insertValues(str, ...values)
{
    if(typeof str != "string")
        throw new TypeError(`Parameter "${str}" is not of type "string" (got "${typeof str}")`);

    if(!str.match(/%[0-9]+/g))
        return str;

    values.forEach((arg, i) => {
        let rex = new RegExp(`%${i + 1}`);

        if(typeof arg !== "string" && typeof arg.toString == "function")
            arg = arg.toString();

        if(str.match(rex))
        {
            try
            {
                str = str.replace(rex, arg);
            }
            catch(err)
            {
                throw new TypeError(`Value "${arg}" at index ${i} could not be inserted: ${err}`);
            }
        }
    });

    return str;
}

module.exports = insertValues;
