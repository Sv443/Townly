class CustomError extends Error
{
    /** @param {String} message The long / detailed error message */
    constructor(message)
    {
        super(message);
        this.name = "Short Name / Description";
    }
}

module.exports = { CustomError };
