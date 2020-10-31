// TODO:
const Need = require("../Need");

/**
 * The need for jobs, shops and commerce in the vicinity
 */
class Commerce extends Need
{
    constructor()
    {
        super("Commerce", "Your citizens need to be able to buy stuff", 0.8);
    }
}

module.exports = Commerce;
