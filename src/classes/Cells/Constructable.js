const Cell = require("../Cell");


/**
 * Base class for all cells that can be built by the player
 */
class Constructable extends Cell
{
    /**
     * Constructs an instance of the Constructable class, a base class for all cells that the player can build
     * @param {Cell.CellType} [type] Undefined = defaults to "special"
     */
    constructor(type)
    {
        if(!type)
            type = "special";

        super(type);
    }

    //#MARKER static props

    /**
     * Returns this constructable's name
     * @returns {String}
     */
    static getName()
    {
        return "INVALID";
    }

    /**
     * Returns this constructable's base cost (without quantity modifier)
     * @returns {String}
     */
    static getBaseCost()
    {
        return 100;
    }
}

module.exports = Constructable;
