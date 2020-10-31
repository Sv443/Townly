// TODO:
const Need = require("../Need");

/**
 * The need for social activities and freedom
 */
class Social extends Need
{
    constructor()
    {
        super("Social", "Humans require adequate social contact to thrive", 0.9);
    }
}

module.exports = Social;
