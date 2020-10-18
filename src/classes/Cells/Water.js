// const scl = require("svcorelib");

const Cell = require("../Cell");


class Water extends Cell
{
    constructor()
    {
        super("water");

        this.setColors("blue", "black");
        this.deep = false;
        this.canBeBuiltOn = false;
    }

    /**
     * Sets if a water cell is deep or not
     * @param {Boolean} deep 
     */
    setDeepWater(deep)
    {
        if(typeof deep == "boolean")
            this.deep = deep;
        else
            throw new TypeError(`Param "deep" of Water.setDeepWater() is not a boolean`);
    }

    /**
     * Gets called when this cell is bulldozed
     * @returns {Boolean} Should return `true` to allow this cell to be bulldozed or `false` to disable bulldozing for this cell
     */
    bulldoze()
    {
        return false; // water can't be bulldozed
    }
}

module.exports = Water;
