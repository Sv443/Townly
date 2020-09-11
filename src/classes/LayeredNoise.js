const scl = require("svcorelib");
const Perlin = require("pf-perlin");
const Worley = require("worley-noise");
const Simplex = require("simplex-noise");


const lowestImportantness = 5;

/**
 * @typedef {"perlin"|"simplex"|"worley"} CoherentNoiseAlgorithm
 */

class LayeredNoise
{
    // for noise layering multiplier:
    // log(a - x) + c
    //
    // c = vertical offset from 0
    // a = "falloff point"
    // x = input number on horizontal axis
    
    constructor()
    {
        this.layers = [];
    }

    /**
     * 
     * @param {CoherentNoiseAlgorithm} algorithm 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} [seed]
     * @param {Number} [resolutionModifier] Floating point number - smaller == more detailed / dense noise - defaults to 1.0
     */
    addLayer(algorithm, width, height, seed, resolutionModifier)
    {
        let newLayer = [];

        if(typeof resolutionModifier != "number")
            resolutionModifier = 1.0;
        else
            resolutionModifier = parseFloat(resolutionModifier);
        
        if(typeof width != "number" && typeof height != "number")
            throw new TypeError("width and/or height are not numbers");
        
        width = width.toFixed(0);
        height = height.toFixed(0);

        if(!seed || typeof seed != "number")
            seed = scl.seededRNG.generateRandomSeed(16);

        let layerCount = 0;

        if(this.layers && Array.isArray(this.layers))
            layerCount = this.layers.length;


        switch(algorithm)
        {
            case "perlin":
            {
                let gen = new Perlin({
                    dimensions: 2,
                    seed: seed
                });

                for(let x = 0; x < height; x++)
                {
                    newLayer.push([]);

                    for(let y = 0; y < width; y++)
                    {
                        let resolution = this.getLayerImportantness(layerCount);

                        // console.log(`${x} ${y} - res: ${resolution}`);

                        let val = gen.get([x / resolution, y / resolution]).toFixed(1);

                        newLayer[x].push(val);
                    }
                }

                console.log(newLayer);

                this.layers.push(newLayer);

                break;
            }
            case "simplex":
            {
                break;
            }
            case "worley":
            {
                break;
            }
            default:
                throw new Error("Invalid algorithm");
        }
    }

    /**
     * Gets the logarithmic importantness of a layer
     * @param {Number} index 
     * @returns {Number} Floating-point multiplier (0.0 - 1.0)
     */
    getLayerImportantness(index)
    {
        // https://www.desmos.com/calculator/gjmpiyqvow
        let a = -1.5;
        let b = 0.16 + 0.09;
        let c = 51.0;
        
        let bPowed = Math.pow(b, index);

        let importantness = (a * bPowed) + c;

        console.log(`getimp ${index} - ${importantness}`);

        if(importantness > 50)
            importantness = 50;

        if(importantness < 0.0)
            importantness = lowestImportantness;

        return importantness;
    }
}

module.exports = LayeredNoise;
