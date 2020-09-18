const MultiCellPart = require("../MultiCellPart");
const MultiCellStructure = require("../MultiCellStructure");


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
