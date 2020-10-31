// TODO:
const Need = require("../Need");

/**
 * The need for adequate electrical capacity
 */
class Electricity extends Need
{
    constructor()
    {
        super("Electricity", "Your residents require electricity to live a modern life", 1.0);
    }
}

module.exports = Electricity;
