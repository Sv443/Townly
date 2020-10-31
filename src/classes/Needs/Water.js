// TODO:
const Need = require("../Need");

/**
 * The need for adequate water capacity
 */
class Water extends Need
{
    constructor()
    {
        super("Water", "Your residents require water to be aliven'tn't", 1.0);
    }
}

module.exports = Water;
