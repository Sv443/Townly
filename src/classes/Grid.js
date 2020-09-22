const scl = require("svcorelib");

const LayeredNoise = require("./LayeredNoise");
const Cell = require("./Cell");
const Chunk = require("./Chunk");
const dbg = require("../dbg");

const settings = require("../../settings");


/** @typedef {"Lakes"|"LakesAndRivers"|"Archipelago"|"Superflat"} MapType */
const mapTypes = [ "Lakes", "LakesAndRivers", "Archipelago", "Superflat" ];
const mapSizes = [ [ 1000, 500 ], [ 3000, 1500 ], [ 10000, 5000 ] ];

class Grid
{
    /**
     * Creates an instance of the class Grid
     * @param {Number} width Has to be a multiple of `settings.chunks.width`
     * @param {Number} height Has to be a multiple of `settings.chunks.height`
     */
    constructor(width, height)
    {
        this.size = [ width, height ];
        this.mapSeed = null;

        /** @type {Chunk[][]} */
        this.chunks = [];
    }

    /**
     * Replaces a certain cell with one with the provided data
     * @param {Number} x 
     * @param {Number} y 
     * @param {Cell.CellData} cellData 
     */
    setCell(x, y, cellData)
    {
        // TODO:
        scl.unused(x, y, cellData);
    }

    /**
     * Replaces a certain chunk with one with the provided data
     * @param {Number} x 
     * @param {Number} y 
     * @param {Chunk.ChunkData} chunkData 
     */
    setChunk(x, y, chunkData)
    {
        // TODO:
        scl.unused(x, y, chunkData);
    }

    /**
     * Returns all of the grid's chunks as a two-dimensional array
     * @returns {Chunk[][]}
     */
    getAllChunks()
    {
        if(this.chunks.length == 0)
            throw new Error(`Can't read chunks in grid since no chunks were set yet`);

        return this.chunks;
    }

    /**
     * Returns all of the grid's chunks that intersect with a specified bounding box as a two-dimensional array
     * @param {Number[]} tlCorner Top left corner [X, Y]
     * @param {Number[]} brCorner Bottom right corner [X, Y]
     * @returns {Chunk[][]}
     */
    getActiveChunks(tlCorner, brCorner)
    {
        // TODO:
        scl.unused(tlCorner, brCorner);
    }

    /**
     * Generates a map using coherent noise algorithms and noise layering
     * @param {MapType} type 
     * @param {Number} [seed] Leave empty to generate a random seed (the prop `seed` will be set on the object with the generated seed)
     * @param {Function} [progressCallback] Gets passed two params: (err, [ layerNbr, totLayers, curIter, totIter ])
     * @throws Throws an error if the dimensions are not multiples of the chunk size defined in the settings
     */
    generateMap(type, seed, progressCallback)
    {
        if(typeof progressCallback != "function")
            progressCallback = () => {};
        
        let progCb = (err, prog, layerNbr, totLayers) => {
            return progressCallback(err, [layerNbr, totLayers, prog[0], prog[1]]);
        };

        if(!seed)
            seed = scl.seededRNG.generateRandomSeed(16);
        
        this.seed = seed;

        if(this.size[0] % settings.chunks.width != 0 || this.size[1] % settings.chunks.height)
            throw new Error(`Can't generate a map with the size ${this.size[0]}x${this.size[0]} - they need to be divisible by ${settings.chunks.width} (width) and ${settings.chunks.height} (height)`);

        let ln = new LayeredNoise(this.size[0], this.size[1]);

        //#SECTION add layers

        switch(type)
        {
            case "Lakes":
            {
                let resolutionModifier = 4.5;
                let layerAmount = 2;
                
                for(let i = 0; i < layerAmount; i++)
                {
                    ln.addLayer("perlin", seed, resolutionModifier, ((err, prog) => progCb(err, prog, (i + 1), layerAmount)) );
                }

                break;
            }
            case "LakesAndRivers":
            {
                let perlinResolutionModifier = 4.5;
                let perlinLayerAmount = 1;
                
                for(let i = 0; i < perlinLayerAmount; i++)
                {
                    ln.addLayer("perlin", seed, perlinResolutionModifier, ((err, prog) => progCb(err, prog, (i + 1), perlinLayerAmount)) );
                }

                let simplexResolutionModifier = 3.0;
                let simplexLayerAmount = 1;
                
                for(let i = 0; i < simplexLayerAmount; i++)
                {
                    ln.addLayer("simplex2", seed, simplexResolutionModifier, ((err, prog) => progCb(err, prog, (i + 1), simplexLayerAmount)) );
                }

                break;
            }
            case "Archipelago":
            {
                let resolutionModifier = 0.1;
                let layerAmount = 2;
                
                for(let i = 0; i < layerAmount; i++)
                {
                    ln.addLayer("simplex", seed, resolutionModifier, ((err, prog) => progCb(err, prog, (i + 1), layerAmount)) );
                }

                break;
            }
            case "Superflat":
            {
                break;
            }
        }

        //#SECTION calc noise map, smooth it and convert to chunks

        let generatedGrid = ln.generateNoiseMap();

        Grid.smoothGrid(generatedGrid); // smooth the grid

        this.setChunksFromGrid(generatedGrid);

        console.log(this.chunks);
    }

    /**
     * Uses cellular automata to smooth a passed grid, removing jarring anomalies like out-of-place cells.  
     * ! Modifies the parameter instead of returning a separate reference !
     * @param {Cell[][]} grid
     * @param {Number} passes How many times to run this algorithm
     * @param {Boolean} [extraSmooth] Set to `true` to optimize the sampling function to make the final grid even smoother
     * @returns {void}
     * @static
     */
    static smoothGrid(grid, passes, extraSmooth)
    {
        if(typeof passes != "number" || passes <= 0)
            passes = 1;

        if(extraSmooth !== true)
            extraSmooth = false;

        let allCellTypes = Cell.getAvailableTypes();

        let getAdjacentTypes = (x, y) => {
            let adj = [];
            let maxX = grid.length;
            let maxY = grid[0].length;

            let checkIdxs = [];

            // I hate myself but idk how else to do this:

            //  ░ ░ ░ ░ ░
            //  ░ ░ ░ ░ ░
            //  ░ ░ ■ ░ ░
            //  ░ ░ ░ ░ ░
            //  ░ ░ ░ ░ ░

            checkIdxs.push([ x, y ]); // M
            

            //  ░ ░ ░ ░ ░
            //  ░ ■ ■ ■ ░
            //  ░ ■ ░ ■ ░
            //  ░ ■ ■ ■ ░
            //  ░ ░ ░ ░ ░

            checkIdxs.push([ x - 1, y - 1 ]); // NW
            checkIdxs.push([ x - 1, y ]);     // N
            checkIdxs.push([ x - 1, y + 1 ]); // NE
            checkIdxs.push([ x, y - 1 ]);     // W
            checkIdxs.push([ x, y + 1 ]);     // E
            checkIdxs.push([ x + 1, y - 1 ]); // SW
            checkIdxs.push([ x + 1, y ]);     // S
            checkIdxs.push([ x + 1, y + 1 ]); // SE


            if(extraSmooth)
            {
                //  ░ ■ ■ ■ ░
                //  ■ ░ ░ ░ ■
                //  ■ ░ ░ ░ ■
                //  ■ ░ ░ ░ ■
                //  ░ ■ ■ ■ ░

                checkIdxs.push([ x - 2, y ]);     // NN
                checkIdxs.push([ x - 2, y - 1 ]); // NNW
                checkIdxs.push([ x - 2, y + 1 ]); // NNE
                checkIdxs.push([ x, y - 2 ]);     // WW
                checkIdxs.push([ x - 1, y - 2 ]); // NWW
                checkIdxs.push([ x + 1, y - 2 ]); // SWW
                checkIdxs.push([ x + 2, y ]);     // SS
                checkIdxs.push([ x + 2, y - 1 ]); // SSW
                checkIdxs.push([ x + 2, y + 1 ]); // SSE
                checkIdxs.push([ x, y + 2 ]);     // EE
                checkIdxs.push([ x - 1, y + 2 ]); // NEE
                checkIdxs.push([ x + 1, y + 2 ]); // SEE
            }


            checkIdxs.forEach(idx => {
                if(idx[0] >= 0 && idx[1] >= 0
                    && idx[0] < maxX && idx[1] < maxY)
                {
                    adj.push(grid[idx[0]][idx[1]].type);
                }
            });

            return adj;
        };

        let runSmoothing = () => {
            for(let x = 0; x < grid.length; x++)
            {
                for(let y = 0; y < grid[0].length; y++)
                {
                    let adjacentTypes = getAdjacentTypes(x, y);
                    let cellTypesAmount = {};

                    allCellTypes.forEach(ct => {
                        cellTypesAmount[ct] = 0;
                    });

                    adjacentTypes.forEach(t => {
                        cellTypesAmount[t]++;
                    });


                    let mostOccuringType = null;
                    Object.values(cellTypesAmount).forEach((amt, i) => {
                        let ctKeys = Object.keys(cellTypesAmount);

                        if(!mostOccuringType)
                            mostOccuringType = ctKeys[i];
                        
                        if(amt > cellTypesAmount[mostOccuringType])
                            mostOccuringType = ctKeys[i];
                    });

                    grid[x][y].setType(mostOccuringType);
                }
            }
        };

        for(let p = 0; p < passes; p++)
        {
            runSmoothing();
        }
    }

    /**
     * Returns all available map generation preset types
     * @returns {MapType[]}
     * @static
     */
    static getMapTypes()
    {
        return mapTypes;
    }

    /**
     * Returns all available map generation size presets
     * @returns {Number[][]} [ [ W, H ], [ W, H ], ... ]
     * @static
     */
    static getMapSizes()
    {
        return mapSizes;
    }

    /**
     * Sets this grid's chunks from a grid of cells
     * @param {Array<Array<Cell>>} generatedGrid 
     */
    setChunksFromGrid(generatedGrid)
    {
        // TODO: fix everything

        let chunks = [];
        let currentChunkPos = [0, 0];

        let maxChunksPerRow = (this.size[0] / settings.chunks.width);
        let chunksToGenerate = maxChunksPerRow * (this.size[1] / settings.chunks.height);
        
        for(let c = 0; c < chunksToGenerate; c++)
        {
            if(c % maxChunksPerRow == 0)
                chunks.push([]);

            chunks[currentChunkPos[0]][currentChunkPos[1]] = new Chunk();

            for(let x = 0; x < settings.chunks.height; x++)
            {
                for(let y = 0; y < settings.chunks.width; y++)
                {
                    let xOffset = currentChunkPos[0] * settings.chunks.height || 0;
                    let yOffset = currentChunkPos[1] * settings.chunks.width || 0;

                    xOffset = xOffset != 0 ? xOffset - 1 : xOffset;
                    yOffset = yOffset != 0 ? yOffset - 1 : yOffset;

                    let cell = generatedGrid[x + xOffset][y + yOffset];
                    chunks[currentChunkPos[0]][currentChunkPos[1]].setCell(x, y, cell);
                }
            }

            currentChunkPos = [ currentChunkPos[0], (currentChunkPos[1] + 1) ];

            if(currentChunkPos[1] == maxChunksPerRow)
            {
                currentChunkPos = [ (currentChunkPos[0] + 1), currentChunkPos[1] ];
                chunks.push([]);
            }
        }

        this.chunks = chunks;
    }

    /**
     * Calls each chunk's and thus cell's update() method.  
     * Is to be called in advance for each frame to be ready to be drawn.
     * @returns {Promise}
     */
    update()
    {
        return new Promise((updPRes, updPRej) => {
            dbg("Grid", `Updating grid...`);

            let promises = [];
            let beginT = new Date().getTime();

            this.chunks.forEach((row) => {
                row.forEach((chunk) => {
                    promises.push(new Promise((chunkPRes, chunkPRej) => {
                        chunk.update().then(() => chunkPRes((beginT - new Date().getTime()))).catch(err => chunkPRej(err));
                    }));
                });
            });

            Promise.all(promises).then((res) => {
                // calc average chunk update time
                let avgTimePerChunk = 0;
                res.forEach(t => { avgTimePerChunk += t; });
                avgTimePerChunk /= res.length;

                dbg("Grid", `Average chunk update time: ${avgTimePerChunk}ms`);
                return updPRes(avgTimePerChunk);
            }).catch(err => {
                return updPRej(`Error(s) while updating chunks: ${Array.isArray(err) ? `\n- ${err.join("\n- ")}` : err}`);
            });
        });
    }
}

module.exports = Grid;
