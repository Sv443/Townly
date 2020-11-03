const Cell = require("../Cell");


/**
 * Base class for all cells that can be built by the player  
 * Has properties like name, base cost, etc.
 */
class Constructable extends Cell
{
    /**
     * Constructs an instance of the Constructable class, a base class for all cells that the player can build
     * @param {Cell.CellType} [type] Undefined = defaults to "special"
     */
    constructor(type)
    {
        if(!type)
            type = "special";

        super(type);

        this.constructionTimestamp = new Date().getTime();
    }

    /**
     * Checks if this Constructable has passed a certain age in seconds
     * @param {Number} seconds 
     * @returns {Boolean} Returns true if this Constructable is older than the provided amount of seconds, else returns false
     */
    ageFulfilled(seconds)
    {
        if(typeof seconds != "number")
            seconds = parseInt(seconds);
        
        if(isNaN(seconds))
            throw new TypeError(`Parameter "seconds" in Constructable.ageFulfilled() couldn't be resolved to a number.`);
        
        return (new Date().getTime() >= (this.constructionTimestamp + (seconds * 1000)));
    }

    //#MARKER static props

    /**
     * Returns this constructable's name
     * @returns {String}
     */
    static getName()
    {
        return "INVALID";
    }

    /**
     * Returns this constructable's base cost (without quantity modifier)
     * @returns {String}
     */
    static getBaseCost()
    {
        return 100;
    }
}

module.exports = Constructable;
