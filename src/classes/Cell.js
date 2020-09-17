const scl = require("svcorelib");


//#MARKER typedefs

/** @typedef {"land"|"forest"|"water"|"deepwater"|"residential"|"commercial"|"industrial"|"road"|"special"} CellType */
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

/** @type {Array<CellType>} */
const availableTypes = [ "land", "forest", "water", "deepwater", "residential", "commercial", "industrial", "road", "special" ];

//#MARKER Class

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

    //#MARKER Getters and Setters

    //#SECTION Type
    /**
     * Sets the type of the cell
     * @param {CellType} type 
     */
    setType(type)
    {
        this.type = type;
    }
    
    /**
     * @returns {CellType}
     */
    getType()
    {
        return this.type || "water";
    }

    //#SECTION Colors
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

    //#SECTION Char
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

    /**
     * Returns the character of this cell
     * @returns {String}
     */
    getChar()
    {
        if(typeof this.char != "string" || this.char.length != 1)
            throw new Error(`Cell's character is not a string or the length is larger or smaller than 1`);
    }

    //#MARKER Static Methods
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
     * Returns all available cell types
     * @returns {Array<CellType>}
     */
    static getAvailableTypes()
    {
        return availableTypes;
    }

    //#MARKER Update

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
