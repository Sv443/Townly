const scl = require("svcorelib");

/** @typedef {"empty"|"water"|"residential"|"commercial"|"industrial"|"road"|"special"} CellType */
/** @typedef {"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"} Color */

/**
 * @typedef {Object} CellObject
 * @prop {CellType} type
 */

/**
 * @typedef {Object} ColorsObjectEsc
 * @prop {String} fg
 * @prop {String} bg
 */

/**
 * @typedef {Object} ColorsObject
 * @prop {Color} fg
 * @prop {Color} bg
 */

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
        this.char = "?";
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
     * Returns the escape code (`\x1b[XYm`) of a given color
     * @param {Color} colorName 
     * @param {Boolean} [isBackground=false] 
     * @returns {String}
     */
    colorToEscapeCode(colorName, isBackground)
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
     * Returns an object containing the colors of the cell
     * @param {Boolean} escapeCode Set to `false` to get the color name instead of the escape code
     * @returns {ColorsObject|ColorsObjectEsc}
     */
    getColors(escapeCode = true)
    {
        if(escapeCode !== false)
            escapeCode = true;

        return {
            fg: escapeCode ? this.colorToEscapeCode(this.fgcolor) : this.fgcolor,
            bg: escapeCode ? this.colorToEscapeCode(this.bgcolor) : this.bgcolor
        }
    }

    /**
     * Sets the colors of a cell
     * @param {Color} [fgcolor] Leave undefined or falsy to not overwrite the current color
     * @param {Color} [bgcolor] Leave undefined or falsy to not overwrite the current color
     */
    setColors(fgcolor, bgcolor)
    {
        if(fgcolor)
            this.fgcolor = fgcolor;

        if(bgcolor)
            this.bgcolor = bgcolor;
    }

    /**
     * Returns the character of this cell
     * @returns {String}
     */
    getChar()
    {
        if(typeof this.char != "string" || this.char.length != 1)
            throw new Error(`Cell's character is not a string or the length is larger or smaller than 1`);
    }

    /**
     * Sets this cell's character
     * @param {String} char String with a length of 1
     * @throws Throws an error if the passed parameter is not a string or longer than 1
     */
    setChar(char)
    {
        if(typeof char != "string" || char.length != 1)
            throw new Error(`Couldn't set Cell's character: parameter is not a string or the length is larger or smaller than 1`);
        
        this.char = char;
    }
}

module.exports = Cell;
