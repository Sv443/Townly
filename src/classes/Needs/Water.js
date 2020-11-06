// TODO:
const tr = require("../../translate");
const Need = require("../Need");

/**
 * The need for adequate water capacity
 */
class Water extends Need
{
    constructor()
    {
        super(tr("needs", "water-name"), tr("needs", "water-desc"), 1.0);
    }
}

module.exports = Water;
