// Base class for inhabited cells like residential, commercial and industrial

// const scl = require("svcorelib");

const Cell = require("../Cell");


/**
 * Base class for inhabited cells like residential, commercial and industrial
 */
class InhabitedCell extends Cell
{
    /**
     * Don't construct an object of this type!
     * @param {Cell.CellType} type 
     */
    constructor(type)
    {
        super(type);

        this.canLevelUp = true;
        this.level = 1;
        this.constructionTimestamp = new Date().getTime();
    }

    /**
     * Levels up this cell
     */
    levelUp()
    {
        if(this.canLevelUp)
            this.level++;
    }

    /**
     * A method that gets called when this cell is bulldozed
     * @returns {Boolean} Should return `true` to allow this cell to be bulldozed or `false` to disable bulldozing for this cell
     */
    bulldoze()
    {
        return true;
    }
}

module.exports = InhabitedCell;
