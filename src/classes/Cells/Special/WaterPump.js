const Cell = require("../../Cell");
const MultiCellPart = require("../MultiCellPart");
const MultiCellStructure = require("../MultiCellStructure");


class WaterPump extends MultiCellStructure
{
    constructor()
    {
        super([ 4, 4 ]);

        this.cells = [
            "┌──┐",
            "│☼╖│",
            "╞╛║│",
            "└─╨┘"
        ];

        /** @type {MultiCellStructure.ColorObj[][]|null[][]} */
        this.colors = [
            [ { fgcol: "cyan" }, null, null, null ],
            [ { fgcol: "cyan" }, { fgcol: "white" }, { fgcol: "blue" }, { fgcol: "cyan" } ],
            [ { fgcol: "cyan" }, { fgcol: "blue" }, null, { fgcol: "cyan" } ],
            [ { fgcol: "cyan" }, null, null, null ]
        ];
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Boolean} escapeCode 
     * @returns {MultiCellStructure.ColorObj}
     */
    getColor(x, y, escapeCode)
    {
        return {
            fgcol: (escapeCode === true ? Cell.colorToEscapeCode(this.colors[x][y].fgcol) : this.colors[x][y].fgcol),
            bgcol: (escapeCode === true ? Cell.colorToEscapeCode(this.colors[x][y].bgcol) : this.colors[x][y].bgcol)
        }
    }
}

class WaterPumpCellPart extends MultiCellPart
{
    /**
     * @param {WaterPump} waterpump 
     */
    constructor(waterpump)
    {
        super(waterpump);
    }

    static getName()
    {
        return "Water Pump";
    }

    static getBaseCost()
    {
        return 20000;
    }
}

module.exports = WaterPump;
module.exports.CellPart = WaterPumpCellPart;
