const scl = require("svcorelib");

const MultiCellPart = require("./MultiCellPart");
const Cell = require("../Cell");


scl.unused("typedefs:", MultiCellPart, Cell);

/**
 * @typedef {Object} ColorObj
 * @prop {Cell.Color} [fgcol=rst]
 * @prop {Cell.Color} [bgcol=rst]
 */

/**
 * Handles structures that are larger than a single cell.  
 * This class interfaces with its child objects of class MultiCellPart.
 */
class MultiCellStructure
{
    /**
     * @param {Number[]} size [W, H]
     */
    constructor(size)
    {
        this.size = size;
        /** @type {MultiCellPart[]} */
        this.cellParts = [];
    }

    /**
     * @param {MultiCellPart} cellPart 
     */
    addCellPart(cellPart)
    {
        this.cellParts.push(cellPart);
    }

    bulldoze()
    {
        // TODO: ask user to confirm bulldozing
        this.cellParts.forEach(cp => {
            cp.bulldoze();
        });
        return true;
    }
}

module.exports = MultiCellStructure;
