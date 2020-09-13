const scl = require("svcorelib");
const Perlin = require("pf-perlin");
// const Worley = require("worley-noise"); // for a future update
// const Simplex = require("simplex-noise");

const Cell = require("./Cell");


scl.unused("typedefs:", Cell);

/** @typedef {"perlin"|"simplex"} NoiseAlgorithm */

class LayeredNoise
{
    /**
     * Constructs a new object of type LayeredNoise
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height)
    {
        this.layers = [];
        this.seeds = [];

        if(typeof width != "number" && typeof height != "number")
            throw new TypeError("width and/or height are not numbers");

        this.width = parseInt(width);
        this.height = parseInt(height);

        this.baseLayerResolution = 30;             // base resolution for the first layer
        this.resolutionDecrementMultiplier = 0.75; // when iterating over each layer, how much the importance should be decreased by on each iteration
    }

    /**
     * Adds a new layer to the layered noise calculation
     * @param {NoiseAlgorithm} algorithm 
     * @param {Number} [seed]
     * @param {Number} [resolutionModifier] Floating point number - smaller == more detailed / dense noise - defaults to 1.0
     * @returns {Boolean}
     */
    addLayer(algorithm, seed, resolutionModifier)
    {
        let newLayer = [];

        if(typeof resolutionModifier != "number")
            resolutionModifier = 1.0;
        
        let width = this.width.toFixed(0);
        let height = this.height.toFixed(0);

        if(!seed || typeof seed != "number")
            seed = scl.seededRNG.generateRandomSeed(16);

        // let layerCount = 0;

        // if(this.layers && Array.isArray(this.layers))
        //     layerCount = this.layers.length;


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
                        let resolution = this.getLayerResolution();

                        let genX = x / (resolution * resolutionModifier);
                        let genY = y / (resolution * resolutionModifier);

                        let val = parseFloat(gen.get([genX, genY]).toFixed(1));

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

        return true;
    }

    // for noise layering multiplier:
    // log(a - x) + c
    //
    // c = vertical offset from 0
    // a = "falloff point"
    // x = input number on horizontal axis

    /**
     * Gets the resolution of a layer used in the noise algorithm
     * @returns {Number} Integer or single decimal float
     */
    getLayerResolution()
    {
        let resolution = this.baseLayerResolution;

        if(this.layers && Array.isArray(this.layers))
        {
            for(let i = 0; i < this.layers.length; i++)
                resolution *= this.resolutionDecrementMultiplier;
        }

        return parseFloat(resolution.toFixed(1));
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
