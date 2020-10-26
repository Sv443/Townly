const scl = require("svcorelib");

const LayeredNoise = require("./LayeredNoise");
const Cell = require("./Cell");
const Chunk = require("./Chunk");
const dbg = require("../dbg");

const settings = require("../../settings");


/** @typedef {"Lakes"|"LakesAndRivers"|"Archipelago"|"Superflat"} MapType */
const mapTypes = [ "Lakes", "LakesAndRivers", "Archipelago", "Superflat" ];
const mapSizes = [ [ 100, 40 ], [ 500, 200 ], [ 1000, 500 ], [ 3000, 1500 ] ];

class Grid
{
    /**
     * Creates an instance of the class Grid
     * @param {Number} width Has to be a multiple of `settings.chunks.width`
     * @param {Number} height Has to be a multiple of `settings.chunks.height`
     */
    constructor(width, height)
    {
        /** @type {Number[]} The size of the grid - [ width, height ] */
        this.size = [ width, height ];
        /** @type {Number} */
        this.mapSeed = null;

        /** @type {Chunk[][]} */
        this.chunks = [];
    }

    /**
     * Replaces a certain cell with one with the provided data
     * @param {Number} x width
     * @param {Number} y height
     * @param {Cell.CellData} cellData 
     */
    setCell(x, y, cellData)
    {
        // TODO:
        scl.unused(x, y, cellData);
    }

    /**
     * Returns the cell at the passed coordinates
     * @param {Number} x width
     * @param {Number} y height
     * @returns {Cell}
     */
    getCell(x, y)
    {
        // TODO:
        scl.unused(x, y);
        return this.chunks[0][0].getCell(0, 0);
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
        return this.chunks;
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

        /** @type {Cell[][]} */
        let generatedGrid = [];

        switch(type)
        {
            case "Lakes":
            {
                let resolutionModifier = 4.5;
                let layerAmount = 1;
                
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
                let layerAmount = 1;
                
                for(let i = 0; i < layerAmount; i++)
                {
                    ln.addLayer("simplex", seed, resolutionModifier, ((err, prog) => progCb(err, prog, (i + 1), layerAmount)) );
                }

                break;
            }
            case "Superflat":
            {
                for(let h = 0; h < this.size[1]; h++)
                {
                    generatedGrid.push([]);
                    for(let w = 0; w < this.size[0]; w++)
                    {
                        let cell = new Cell("land");
                        generatedGrid[h][w] = cell;
                    }
                }
                break;
            }
        }

        //#SECTION calc noise map, smooth it and convert to chunks

        if(type != "Superflat")
        {
            generatedGrid = ln.generateNoiseMap();

            Grid.smoothGrid(generatedGrid); // smooth the grid
        }

        this.setChunksFromGrid(generatedGrid);
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

        /** @type {Chunk[][]} two dimensional array containing all chunks */
        let chunks = [];

        let maxChunksPerRow = (this.size[0] / settings.chunks.width);
        let maxChunksPerCol = (this.size[1] / settings.chunks.height);

        if(maxChunksPerRow % 1 != 0)
        {
            console.error(`Internal Error: Grid's width is not a multiple of ${settings.chunks.width}`);
            process.exit(1);
        }

        if(maxChunksPerCol % 1 != 0)
        {
            console.error(`Internal Error: Grid's height is not a multiple of ${settings.chunks.height}`);
            process.exit(1);
        }

        /** Which chunk is currently getting its cells assigned */
        let chunkOffset = [0, 0];

        let assignedCellsCount = 0;
        let assignedChunksCount = 0;

        // iterate over chunks in the x axis
        for(let chx = 0; chx < maxChunksPerRow; chx++) // chx = chunks axis x
        {
            chunks.push([]);
            // iterate over chunks in the y axis
            for(let chy = 0; chy < maxChunksPerCol; chy++) // chy = chunks axis y
            {
                /** @type {Number[]} two-dimensional array of cells in the current chunk */
                let cells = [];

                // iterate over cells in the current chunk in the x axis
                for(let clx = 0; clx < settings.chunks.height; clx++) // clx = cells axis x in current chunk
                {
                    cells.push([]);
                    // iterate over cells in the current chunk in the y axis
                    for(let cly = 0; cly < settings.chunks.width; cly++) // cly = cells axis y in current chunk
                    {
                        /** Index of the current cell from the generated grid */
                        let cellIndex = [((chunkOffset[0] * settings.chunks.height) + clx), ((chunkOffset[1] * settings.chunks.width) + cly)];

                        /** Current cell from the generated grid */
                        let currentGeneratedCell = generatedGrid[cellIndex[0]][cellIndex[1]];

                        cells[clx].push(currentGeneratedCell);
                        assignedCellsCount++;
                    }
                }

                chunkOffset[0]++;

                chunks[chx][chy] = new Chunk(cells); // assign cells to chunk

                assignedChunksCount++;
            }
            chunkOffset[1]++;
            chunkOffset[0] = 0;
        }
        chunkOffset = [0, 0];

        dbg("Grid/SetChunks", `Assigned ${assignedCellsCount} cells to ${assignedChunksCount} chunks`);

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
                        chunk.update()
                            .then(() => chunkPRes((beginT - new Date().getTime())))
                            .catch(err => chunkPRej(err));
                    }));
                });
            });

            Promise.all(promises).then((res) => {
                // calc average chunk update time
                // TODO: seems to be incorrect
                let avgTimePerChunk = 0;
                res.forEach(t => { avgTimePerChunk += t; });
                avgTimePerChunk /= res.length;

                return updPRes(Math.abs(avgTimePerChunk));
            }).catch(err => {
                return updPRej(`Error(s) while updating chunks: ${Array.isArray(err) ? `\n- ${err.join("\n- ")}` : err}`);
            });
        });
    }
}

module.exports = Grid;
