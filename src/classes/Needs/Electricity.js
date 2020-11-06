// TODO:
const tr = require("../../translate");
const Need = require("../Need");

/**
 * The need for adequate electrical capacity
 */
class Electricity extends Need
{
    constructor()
    {
        super(tr("needs", "electricity-name"), tr("needs", "electricity-desc"), 1.0);
    }
}

module.exports = Electricity;
