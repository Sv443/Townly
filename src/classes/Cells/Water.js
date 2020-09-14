// const scl = require("svcorelib");

const Cell = require("../Cell");


class Water extends Cell
{
    constructor()
    {
        super("water");
        this.setColor("blue", "black");
        this.deep = false;
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
}

module.exports = Water;
