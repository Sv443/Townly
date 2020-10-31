// TODO:
const Need = require("../Need");

/**
 * The need for healthcare / medical buildings in the vicinity
 */
class Healthcare extends Need
{
    constructor()
    {
        super("Healthcare", "Some of your residents need medical assistance", 0.9);
    }
}

module.exports = Healthcare;
