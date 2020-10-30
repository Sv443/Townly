const scl = require("svcorelib");

const Cell = require("../Cell");
const Constructable = require("./Constructable");


scl.unused("typedefs:", Cell);

/**
 * This is a constructible cell
 */
class Template extends Constructable
{
    constructor()
    {
        super("TYPE");
        this.setColors("white", "black");
        this.setChar("?");
    }

    /**
     * A method that gets called when this cell is bulldozed
     * @returns {Boolean} Should return `true` to allow this cell to be bulldozed or `false` to disable bulldozing for this cell
     */
    bulldoze()
    {
        return true;
    }
}

module.exports = Template;
