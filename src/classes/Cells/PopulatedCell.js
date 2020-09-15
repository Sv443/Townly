// Base class for populated cells like residential, commercial and industrial

// const scl = require("svcorelib");

const Cell = require("../Cell");


/**
 * Base class for populated cells like residential, commercial and industrial
 */
class PopulatedCell extends Cell
{
    /**
     * Don't construct an object of this type!  
     * This is the base class to be used for populated cells like residential, commercial and industrial
     * @param {Cell.CellType} type 
     */
    constructor(type)
    {
        super(type);

        this.level = 1;
        this.constructionTimestamp = new Date().getTime();
    }

    /**
     * Levels up this cell
     */
    levelUp()
    {
        this.level++;
    }
}

module.exports = PopulatedCell;
