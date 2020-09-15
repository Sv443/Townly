const scl = require("svcorelib");

const LayeredNoise = require("./LayeredNoise");
const Cell = require("./Cell");
const Chunk = require("./Chunk");
const settings = require("../../settings");


/** @typedef {"Lakes"|"LakesAndRivers"|"Archipelago"|"Superflat"} MapType */

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
        scl.unused(x, y, chunkData);
    }

    /**
     * Generates a map using coherent noise algorithms and noise layering
     * @param {MapType} type 
     * @param {Number} [seed] Leave empty to generate a random seed (the prop `seed` will be set on the object with the generated seed)
     * @throws Throws an error if the dimensions are not multiples of the chunk size defined in the settings
     */
    generateMap(type, seed)
    {
        if(!seed)
            seed = scl.seededRNG.generateRandomSeed(16);
        
        this.seed = seed;

        if(this.size[0] % settings.chunks.width != 0 || this.size[1] % settings.chunks.height)
            throw new Error(`Can't generate a map with the size ${this.size[0]}x${this.size[0]} - they need to be divisible by ${settings.chunks.width} (width) and ${settings.chunks.height} (height)`);

        let ln = new LayeredNoise(this.size[0], this.size[1]);

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
            case "Archipelago":
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

        let generatedGrid = ln.generateNoiseMap();

        this.setChunksFromGrid(generatedGrid);

        console.log(this.chunks);
    }

    /**
     * Uses cellular automata to smoothen out a passed grid, removing jarring anomalies like out-of-place cells
     * @param {Array<Array<Cell>>}
     * @returns {Array<Array<Cell>>}
     */
    smoothGrid(grid)
    {

    }

    /**
     * Sets this grid's chunks from a grid of cells
     * @param {Array<Array<Cell>>} generatedGrid 
     */
    setChunksFromGrid(dimensions, generatedGrid)
    {
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
}

module.exports = Grid;
