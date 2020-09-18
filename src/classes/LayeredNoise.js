const scl = require("svcorelib");
const Perlin = require("pf-perlin");
const Simplex = require("simplex-noise");
const { Simplex2 } = require("tumult");

const Cell = require("./Cell");
const dbg = require("../dbg");


scl.unused("typedefs:", Cell);

/** @typedef {"perlin"|"simplex"|"simplex2"} NoiseAlgorithm */

class LayeredNoise
{
    /**
     * Constructs a new object of type LayeredNoise
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height)
    {
        this.baseLayerResolution = 30;             // base resolution for the first layer
        this.resolutionDecrementMultiplier = 0.7;  // when iterating over each layer, how much the importance should be decreased by on each iteration
        this.layerMultiplierDecrement = 0.5;       // when adding layers together, by how much the weight / importance should decrease

        /** @type {Number[][][]} */
        this.layers = [];
        /** @type {Number[]} */
        this.seeds = [];

        if(typeof width != "number" && typeof height != "number")
            throw new TypeError("width and/or height are not numbers");

        this.width = parseInt(width);
        this.height = parseInt(height);
    }

    /**
     * Adds a new layer to the layered noise calculation
     * @param {NoiseAlgorithm} algorithm 
     * @param {Number} [seed]
     * @param {Number} [resolutionModifier] Floating point number - smaller == more zoomed out / more noisy noise - defaults to 1.0
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

                        let val = parseFloat(gen.get([genX, genY]).toFixed(3));

                        newLayer[x].push(val);
                    }
                }

                this.layers.push(newLayer);
                this.seeds.push(seed);

                break;
            }
            case "simplex":
            {
                let gen = new Simplex(seed);
                
                for(let x = 0; x < height; x++)
                {
                    newLayer.push([]);

                    for(let y = 0; y < width; y++)
                    {
                        let resolution = this.getLayerResolution();

                        let genX = x / (resolution * resolutionModifier);
                        let genY = y / (resolution * resolutionModifier);

                        let val = gen.noise2D(genX, genY);

                        newLayer[x].push(val);
                    }
                }

                this.layers.push(newLayer);
                this.seeds.push(seed);

                break;
            }
            case "simplex2":
            {
                let gen = new Simplex2(seed);
                
                for(let x = 0; x < height; x++)
                {
                    newLayer.push([]);

                    for(let y = 0; y < width; y++)
                    {
                        let resolution = this.getLayerResolution();

                        let genX = x / (resolution * resolutionModifier);
                        let genY = y / (resolution * resolutionModifier);

                        let contrast = 9;

                        let val = Math.abs(gen.gen(genX, genY) * contrast);

                        newLayer[x].push(val);
                    }
                }

                this.layers.push(newLayer);
                this.seeds.push(seed);

                break;
            }
            default:
                throw new Error("Invalid algorithm");
        }

        dbg("LayeredNoise", `Added a layer - algorithm: ${algorithm} - seed: ${seed} - resolution modifier: ${resolutionModifier}`);

        return true;
    }

    // optimal noise layering formula:
    // log10(a - x) + c

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
     * Returns the logarithmic, floating-point multiplier for adding noise layers together
     * @param {Number} idx The 0-based index of the current layer
     * @return {Number} Will not be bigger than 1.0
     */
    getLayerMultiplier(idx)
    {
        const steepness = 5; // how "steep" the logarithmic curve should be
        const xOffset = 0;   // horizontal offset on the x axis - negative = to the left, positive = to the right
        const yOffset = 5;   // how far up the y axis the curve should start
        const base = 10;     // the base of the number - set to 1 to start the curve at 10

        let mult = (-Math.log10(idx - xOffset) * steepness + yOffset) / base;

        if(mult > 1.0)
            return 1.0;

        return mult;
    }

    /**
     * Adds all previously added layers together
     * @returns {Array<Array<Cell>>}
     */
    generateNoiseMap()
    {
        let addMap = [];
        let map = [];

        this.layers.forEach((layer, layerIdx) => {
            let mult = this.getLayerMultiplier(layerIdx);
        });

        // TODO: iterate over all layers and add them together
        this.layers[0].forEach((layerX, x) => {
            map.push([]);
            layerX.forEach((layerY, y) => {
                let cell = this.noiseValueToCell(y);
                map[x][y] = cell;
            });
        });

        return map;
    }

    /**
     * Creates a cell out of the passed noise value
     * @param {Number} val Floating-point
     * @returns {Cell}
     */
    noiseValueToCell(val)
    {
        // TODO:
        scl.unused(val);
        return new Cell("land");
    }
}

module.exports = LayeredNoise;





let x = [ // x
    [     // y
        [ // 0, 0
            0.5, 0.6
        ]
    ]
]


/*
For each cell:

l1  1.0  * 0.5  = 0.5
     +             +
l2  0.5  * 0.3  = 0.15
     +             +
l3  0.25 * 0.45 = 0.11
     =             =
    1.75          0.76  /  1.75  =  0.43
     |                      ^
      \---------------------/
*/

/*

l1  1.0 * 0.5 = 0.5
     +           +
l2  0.5 * 0.6 = 0.3
     +           =
    1.5         0.8


0.8 / 1.5 = 0.53


l1  1.0 * 0.3 = 0.3
     +           +
l2  0.9 * 0.7 = 0.21
     =           =
    1.3         0.51


0.51 / 1.3 = 0.39





    ---------------------
    |    |    |    |    |
   0.3  0.4  0.5  0.6  0.7

*/
