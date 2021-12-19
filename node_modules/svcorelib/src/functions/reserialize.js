function reserialize(obj, immutable)
{
    if(typeof obj != "object")
        return obj;

    try
    {
        let reserialized = JSON.parse(JSON.stringify(obj));

        if(immutable === true)
            return Object.freeze(reserialized);

        return reserialized;
    }
    catch(err)
    {
        return obj;
    }
}

module.exports = reserialize;
