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

        let noise = new SimplexNoise(seed);

        let n1 = noise.noise2D(0, 0);
        let n2 = noise.noise2D(0, 1);
        let n3 = noise.noise2D(1, 0);
        let n4 = noise.noise2D(1, 1);

        console.log(n1);
        console.log(n2);
        console.log(n3);
        console.log(n4);
    }
}

module.exports = Grid;
