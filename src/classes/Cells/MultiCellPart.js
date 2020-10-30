const scl = require("svcorelib");

const SpecialBuilding = require("./SpecialBuilding");
const MultiCellStructure = require("./MultiCellStructure");


scl.unused("typedefs:", MultiCellStructure);

/**
 * One of the cells of a parent object of class MultiCellStructure
 */
class MultiCellPart extends SpecialBuilding
{
    /**
     * @param {MultiCellStructure} centralInstance An istance of the structure this cell is a part of
     */
    constructor(centralInstance)
    {
        super("multicellpart");

        this.centralInstance = centralInstance;
        this.centralInstance.addCellPart(this);
    }

    bulldoze()
    {
        this.centralInstance.bulldoze();
    }
}

module.exports = MultiCellPart;
