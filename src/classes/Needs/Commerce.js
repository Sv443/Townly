// TODO:
const tr = require("../../translate");
const Need = require("../Need");

/**
 * The need for jobs, shops and commerce in the vicinity
 */
class Commerce extends Need
{
    constructor()
    {
        super(tr("needs", "commerce-name"), tr("needs", "commerce-desc"), 0.8);
    }
}

module.exports = Commerce;
