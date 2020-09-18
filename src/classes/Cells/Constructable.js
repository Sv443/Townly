const Cell = require("../Cell");


/**
 * Base class for all cells that can be built by the player
 */
class Constructable extends Cell
{
    /**
     * Constructs an instance of the Constructable class, a base class for all cells that the player can build
     * @param {Cell.CellType} [type] Undefined = defaults to "special"
     * @param {Number} [cost] Absolute, natural number of how much this cell should cost to build - defaults to 100 if left undefined
     */
    constructor(type, cost)
    {
        if(!type)
            type = "special";

        super(type);

        this.cost = parseInt(Math.abs(Math.round(cost)));
        if(!this.cost || isNaN(this.cost))
            this.cost = 100;
    }

    //#MARKER Getters and Setters

    /**
     * Returns this cell's cost to build
     * @returns {Number}
     */
    getCost()
    {
        return this.cost;
    }
    
    /**
     * Sets this cell's cost to build
     * @param {Number} cost An absolute, natural number
     */
    setCost(cost)
    {
        cost = parseInt(Math.abs(Math.round(cost)));
        if(!cost || isNaN(cost))
            this.cost = cost;
    }
}

module.exports = Constructable;
