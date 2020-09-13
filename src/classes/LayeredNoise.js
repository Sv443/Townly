const scl = require("svcorelib");
const Perlin = require("pf-perlin");
// const Worley = require("worley-noise"); // for a future update
// const Simplex = require("simplex-noise");

const Cell = require("./Cell");


scl.unused("typedefs:", Cell);

/** @typedef {"perlin"|"simplex"} NoiseAlgorithm */

class LayeredNoise
{
    constructor()
    {
        this.layers = [];
        this.seeds = [];

        this.layerImportanceBaseMultiplier = 1.0; // base multiplier for layer importance
        this.importanceDecrementMultiplier = 0.5; // when iterating over each layer, how much the importance should be decreased by on each iteration
    }

    /**
     * Adds a new layer to the layered noise calculation
     * @param {NoiseAlgorithm} algorithm 
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
                        let resolution = this.getLayerImportance(layerCount);

                        resolution = 20; // TODO:

                        // console.log(`${x} ${y} - res: ${resolution}`);

                        let val = parseFloat(gen.get([x / (resolution * resolutionModifier), y / (resolution * resolutionModifier)]).toFixed(1));

                        newLayer[x].push(val);
                    }
                }

                this.layers.push(newLayer);
                this.seeds.push(seed);

                break;
            }
            case "simplex":
            {
                break;
            }
            // case "worley":
            // {
            //     break;
            // }
            default:
                throw new Error("Invalid algorithm");
        }
    }

    // for noise layering multiplier:
    // log(a - x) + c
    //
    // c = vertical offset from 0
    // a = "falloff point"
    // x = input number on horizontal axis

    /**
     * Gets the importance of a layer as a multiplier
     * @returns {Number} Floating-point multiplier (0.0 - 1.0)
     */
    getLayerImportance()
    {
        let importance = this.layerImportanceBaseMultiplier;

        if(this.layers && Array.isArray(this.layers))
        {
            for(let i = 0; i < this.layers.length; i++)
                importance *= this.importanceDecrementMultiplier;
        }

        return importance.toFixed(3);
    }

    /**
     * Adds all previously added layers together
     * @returns {Array<Array<Cell.CellObject>>}
     */
    generateNoiseMap()
    {

    }
}

module.exports = LayeredNoise;
