const MultiCellPart = require("../MultiCellPart");
const MultiCellStructure = require("../MultiCellStructure");


/**
 * This class describes the multi-cell town hall  
 * It fulfills the need for "Social" (contrary to real world politics the government of Townly is actually doing a good job)  
 */
class TownHall extends MultiCellStructure
{
    constructor()
    {
        super([ 3, 3 ]);
    }
}

class TownHallCellPart extends MultiCellPart
{
    /**
     * @param {TownHall} townhall 
     */
    constructor(townhall)
    {
        super(townhall);
    }

    static getName()
    {
        return "Town Hall";
    }

    static getBaseCost()
    {
        return 5000;
    }
}

module.exports = TownHall;
module.exports.CellPart = TownHallCellPart;
