/**
 * @typedef {"empty"|"residential"|"commercial"|"industrial"|"road"|"special"} CellType
 */

class Cell
{
    /**
     * 
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
    setCursor(active)
    {
        if(typeof active != "boolean")
            active = false;

        this.cursorActive = active;
    }
}

module.exports = Cell;
