const scl = require("svcorelib");

const settings = require("../../settings");
const Cell = require("./Cell");


scl.unused("typedefs:", Cell);

class Chunk
{
    /**
     * Constructs a new object of type Chunk.  
     * Size is set in the settings file
     * @param {Cell[][]} [cells] A 2D array of cells to assign to this chunk - size needs to be equal to the chunk size settings
     */
    constructor(cells)
    {
        /** @type {Cell[][]} */
        this.cells = null;

        if(Array.isArray(cells))
            this.setCells(cells);

        this.width = settings.chunks.width;
        this.height = settings.chunks.height;
    }

    /**
     * Sets the cell at a specific coordinate
     * @param {Number} x 
     * @param {Number} y 
     * @param {Cell} cell An instance of the class `Cell`
     * @returns {Boolean|String} true or string containing error
     */
    setCell(x, y, cell)
    {
        scl.unused(x, y, cell);

        // TODO:

        return true;
    }

    /**
     * Sets all of the chunk's cells at the same time
     * @param {Cell[][]} cells A 2D array of cells to assign to this chunk - size needs to be equal to the chunk size settings
     * @throws Throws errors if the width or height are invalid or if an item is not an instance of the class Cell
     */
    setCells(cells)
    {
        if(cells.length != settings.chunks.height)
            throw new Error(`Error while setting the cells of a Chunk object - parameter "cells" is ${this.cells.length} tall (expected ${settings.chunks.height})`);

        cells.forEach((row, x) => {
            if(row.length != settings.chunks.width)
                throw new Error(`Error while setting the cells of a Chunk object - row ${x} of parameter "cells" is ${row.length} wide (expected ${settings.chunks.width})`);
            
            row.forEach((cell, y) => {
                if(!(cell instanceof Cell))
                    throw new Error(`Error while setting the cells of a Chunk object - item at position (${x}, ${y}) is not an instance of the class Cell`);
            });
        });

        this.cells = cells;
    }

    /**
     * Returns this chunk's cells as a 2D array
     * @returns {Cell[][]|null[][]}
     */
    getCells()
    {
        return this.cells;
    }

    /**
     * Returns a cell from this chunk at the specified coordinate
     * @param {Number} x width
     * @param {Number} y height
     * @returns {Cell|null}
     */
    getCell(x, y)
    {
        return this.cells[y][x] || null;
    }

    /**
     * Updates this chunk and all of its cells.  
     * Will be called on each frame to calculate the next frame.
     * @returns {Promise}
     */
    update()
    {
        return new Promise((pRes, pRej) => {
            let promises = [];

            this.cells.forEach((valX, x) => {
                valX.forEach((valY, y) => {
                    scl.unused(valY);
                    let cell = this.cells[x][y];
                    promises.push(new Promise((cellPRes) => {
                        cell.update().then(() => cellPRes());
                    }));
                });
            });

            Promise.all(promises)
                .then(() => pRes())
                .catch(err => pRej(err));
        });
    }
}

module.exports = Chunk;
