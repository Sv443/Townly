// Base class for inhabited cells like residential, commercial and industrial

const scl = require("svcorelib");

const Cell = require("../Cell");
const Constructable = require("./Constructable");


scl.unused("typedefs:", Cell);

/**
 * Base class for inhabited cells like residential, commercial and industrial  
 * This class only contains information about the inhabitants of a cell but not its needs
 */
class InhabitedCell extends Constructable
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
        this.inhabitants = 0;
    }

    /**
     * Sets this InhabitedCell's inhabitants count
     * @param {Number} inhabitants 
     */
    setInhabitants(inhabitants)
    {
        if(typeof inhabitants != "number")
            throw new TypeError(`Parameter "inhabitants" in InhabitedCell.setInhabitants() is not a number`);

        this.inhabitants = inhabitants;
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
