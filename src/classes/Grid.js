const scl = require("svcorelib");
const SimplexNoise = require("simplex-noise");

class Grid
{
    constructor(height, width)
    {
        this.size = [height, width];
    }

    /**
     * 
     * @param {Number} seed 
     */
    generateMap(seed)
    {
        if(!seed)
            seed = scl.seededRNG.generateRandomSeed(16);
    }
}

module.exports = Grid;
