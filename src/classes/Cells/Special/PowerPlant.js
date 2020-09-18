const MultiCellPart = require("../MultiCellPart");
const MultiCellStructure = require("../MultiCellStructure");


class PowerPlant extends MultiCellStructure
{
    constructor()
    {
        super([ 5, 3 ]);
    }
}

class PowerPlantCellPart extends MultiCellPart
{
    /**
     * @param {PowerPlant} powerplant 
     */
    constructor(powerplant)
    {
        super(powerplant);
    }

    static getName()
    {
        return "Power Plant";
    }

    static getBaseCost()
    {
        return 20000;
    }
}

module.exports = PowerPlant;
module.exports.CellPart = PowerPlantCellPart;
