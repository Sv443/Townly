const scl = require("svcorelib");

/** @typedef {"empty"|"water"|"residential"|"commercial"|"industrial"|"road"|"special"} CellType */
/** @typedef {"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"} Color */

/**
 * @typedef {Object} CellObject
 * @prop {CellType} type
 */

/** @type {Array<CellType>} */
const availableTypes = [ "empty", "water", "residential", "commercial", "industrial", "road", "special" ];

class Cell
{
    /**
     * Constructs a new object of the class Cell
     * @param {CellType} type 
     */
    constructor(type)
    {
        this.type = type;
        this.cursorActive = false;
    }

    /**
     * Enables or disables a cursor on this cell
     * @param {Boolean} active 
     */
    setCursorActive(active)
    {
        if(typeof active != "boolean")
            active = false;

        this.cursorActive = active;
    }

    /**
     * Sets the color of a cell
     * @param {Color} [fgcolor]
     * @param {Color} [bgcolor]
     */
    setColor(fgcolor, bgcolor)
    {
        if(fgcolor)
            this.fgcolor = fgcolor;

        if(bgcolor)
            this.bgcolor = bgcolor;
    }

    /**
     * Returns the escape code (`\x1b[XYm`) of a given color
     * @param {Color} colorName 
     * @param {Boolean} [isBackground=false] 
     * @returns {String}
     */
    static colorToEscapeCode(colorName, isBackground)
    {
        let col = (isBackground !== true ? scl.colors.fg : scl.colors.bg);

        switch(colorName)
        {
            case "black":
                return col.black;
            case "red":
                return col.red;
            case "green":
                return col.green;
            case "yellow":
                return col.yellow;
            case "blue":
                return col.blue;
            case "magenta":
                return col.magenta;
            case "cyan":
                return col.cyan;
            case "white":
                return col.white;
            default:
                return col.rst;
        }
    }

    /**
     * Sets the type of the cell
     * @param {CellType} type 
     */
    setType(type)
    {
        this.type = type;
    }

    /**
     * Returns all available cell types
     * @returns {Array<CellType>}
     */
    static getAvailableTypes()
    {
        return availableTypes;
    }

    /**
     * Updates this cell.  
     * Will be called each frame to calculate the next frame.
     */
    update()
    {
        // to be overwritten by the subclasses
    }
}

module.exports = Cell;
