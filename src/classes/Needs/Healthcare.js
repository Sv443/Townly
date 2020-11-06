// TODO:
const tr = require("../../translate");
const Need = require("../Need");

/**
 * The need for healthcare / medical buildings in the vicinity
 */
class Healthcare extends Need
{
    constructor()
    {
        super(tr("needs", "healthcare-name"), tr("needs", "healthcare-desc"), 0.9);
    }
}

module.exports = Healthcare;
