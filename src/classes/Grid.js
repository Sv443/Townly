const scl = require("svcorelib");

const LayeredNoise = require("./LayeredNoise");


/** @typedef {"Lakes"|"LakesAndRivers"|"Islands"|"Superflat"} MapType */

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
     */
    generateMap(dimensions, type, seed)
    {
        if(!seed)
            seed = scl.seededRNG.generateRandomSeed(16);
        
        this.seed = seed;

        let ln = new LayeredNoise(dimensions[0], dimensions[1]);

        switch(type)
        {
            case "Lakes":
            {
                let resolutionModifier = 4.5;
                let layerAmount = 2;
                
                for(let i = 0; i < layerAmount; i++)
                {
                    ln.addLayer("perlin", seed, resolutionModifier);
                }

                break;
            }
            case "LakesAndRivers":
            {
                let perlinResolutionModifier = 4.5;
                let perlinLayerAmount = 1;
                
                for(let i = 0; i < perlinLayerAmount; i++)
                {
                    ln.addLayer("perlin", seed, perlinResolutionModifier);
                }

                let simplexResolutionModifier = 3.0;
                let simplexLayerAmount = 1;
                
                for(let i = 0; i < simplexLayerAmount; i++)
                {
                    ln.addLayer("simplex2", seed, simplexResolutionModifier);
                }

                break;
            }
            case "Islands":
            {
                let resolutionModifier = 0.1;
                let layerAmount = 2;
                
                for(let i = 0; i < layerAmount; i++)
                {
                    ln.addLayer("simplex", seed, resolutionModifier);
                }

                break;
            }
            case "Superflat":
            {
                break;
            }
        }
    }
}

module.exports = Grid;
