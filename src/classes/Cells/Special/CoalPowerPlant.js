const tr = require("../../../translate");
const MultiCellPart = require("../MultiCellPart");
const MultiCellStructure = require("../MultiCellStructure");


/**
 * The Coal Power Plant provides a set amount of Electricity for the entire map
 */
class CoalPowerPlant extends MultiCellStructure
{
    constructor()
    {
        super([ 5, 3 ]);
    }
}

class CoalPowerPlantCellPart extends MultiCellPart
{
    /**
     * @param {CoalPowerPlant} powerplant 
     */
    constructor(coalpowerplant)
    {
        super(coalpowerplant);
    }

    static getName()
    {
        return tr("cells", "coalpowerplant-name");
    }

    static getBaseCost()
    {
        return 15000;
    }
}

module.exports = CoalPowerPlant;
module.exports.CellPart = CoalPowerPlantCellPart;
