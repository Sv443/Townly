// TODO:
const tr = require("../../translate");
const Need = require("../Need");

/**
 * The need for social activities and freedom
 */
class Social extends Need
{
    constructor()
    {
        super(tr("needs", "social-name"), tr("needs", "social-desc"), 0.9);
    }
}

module.exports = Social;
