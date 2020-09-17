// Base class for inhabited cells like residential, commercial and industrial

const scl = require("svcorelib");

const InhabitedCell = require("./InhabitedCell");
const Cell = require("../Cell");


scl.unused("typedefs:", Cell);


/**
 * Base class for special buildings like parks, hospitals, fire stations, etc.
 */
class SpecialBuilding extends InhabitedCell
{
    /**
     * Don't construct an object of this type!
     */
    constructor()
    {
        super("special");

        this.canLevelUp = false;
        this.influenceRadius = 0;
    }

    /**
     * Sets the influence radius of this cell
     * @param {Number} radius An absolute, natural number (if not, gets converted to one)
     */
    setInfluenceRadius(radius)
    {
        if(typeof radius != "number")
            throw new TypeError(`Parameter is not a number!`);
        
        radius = Math.round(Math.abs(radius));
        
        this.influenceRadius = radius;
    }

    /**
     * Returns this cell's influence radius
     * @returns {Number} An absolute, natural number
     */
    getInfluenceRadius()
    {
        return this.influenceRadius;
    }

    /**
     * A method that gets called when this cell is bulldozed
     * @returns {Boolean} Should return `true` to allow this cell to be bulldozed or `false` to disable bulldozing for this cell
     */
    bulldoze()
    {
        // TODO: ask user to confirm the bulldozing
        // TODO: tell game controller to iterate over all special buildings to update the influence radius
        return true;
    }
}

module.exports = SpecialBuilding;
