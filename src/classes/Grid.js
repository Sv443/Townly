const scl = require("svcorelib");

const LayeredNoise = require("./LayeredNoise");


/** @typedef {"LakesAndRivers"|"Rivers"|"Lakes"} MapType */

class Grid
{
    constructor(height, width)
    {
        this.size = [height, width];
        this.mapSeed = null;
        this.cells = [];
    }

    /**
     * Replaces a certain cell with one with the provided data
     * @param {Number} x 
     * @param {Number} y 
     * @param {CellData} cellData 
     */
    setCell(x, y, cellData)
    {
        scl.unused(x, y, cellData);
    }

    /**
     * Generates a map using coherent noise algorithms and noise layering
     * @param {Array<Number>} dimensions [W, H]  /  [X, Y]
     * @param {MapType} type 
     * @param {Number} [seed] Leave empty to generate a random seed (the prop `seed` will be set on the object with the generated seed)
     * @param {Number} [layerAmount=4] Amount of layers of noise that should be added on top of each other
     */
    generateMap(dimensions, type, seed, layerAmount)
    {
        if(!seed)
            seed = scl.seededRNG.generateRandomSeed(16);
        
        this.seed = seed;

        let resolutionModifier = 1.0;
        let ln = new LayeredNoise();
        
        for(let i = 0; i < layerAmount; i++)
        {
            ln.addLayer("perlin", dimensions[0], dimensions[1], seed, resolutionModifier);
        }
    }
}

module.exports = Grid;
