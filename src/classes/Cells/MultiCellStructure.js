const scl = require("svcorelib");

const MultiCellPart = require("./MultiCellPart");


scl.unused("typedefs:", MultiCellPart);

/**
 * Handles structures that are larger than a single cell
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
