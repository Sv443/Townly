class CustomError extends Error
{
    /** @param {String} message The long / detailed error message */
    constructor(message)
    {
        super(message);
        this.name = "Short Name / Description";
        Error.captureStackTrace(this, this.constructor);
    }
}

class OSError extends Error
{
    /** @param {String} message The long / detailed error message */
    constructor(message)
    {
        super(message);
        this.name = "Your current operating system is not supported by the application";
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { CustomError, OSError };
