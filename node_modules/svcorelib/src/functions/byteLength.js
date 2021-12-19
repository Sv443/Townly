function byteLength(str)
{
    if(!str || typeof str != "string")
        return -1;

    return Buffer.byteLength(str, "utf8");
}

module.exports = byteLength;
