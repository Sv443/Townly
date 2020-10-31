const scl = require("svcorelib");

const Cell = require("../Cell");
const Need = require("../Need");
const InhabitedCell = require("./InhabitedCell");

scl.unused("typedefs:", Need, Cell);

/**
 * The needy cell handles Needs of cells and their fulfillment
 */
class NeedyCell extends InhabitedCell
{
    /**
     * Constructs a new object of class NeedyCell
     * @param {Cell.CellType} type 
     */
    constructor(type)
    {
        super(type);

        /** @type {Need[]} */
        this.needs = [];
    }

    /**
     * To be called on each update tick
     */
    update()
    {
        return new Promise((pRes) => {
            return pRes();
        });
    }
}

module.exports = NeedyCell;
