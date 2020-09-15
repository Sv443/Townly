const scl = require("svcorelib");

const settings = require("../../settings");
const Cell = require("./Cell");


scl.unused("typedefs:", Cell);

class Chunk
{
    /**
     * Constructs a new object of type Chunk.  
     * Size is set in the settings file
     */
    constructor()
    {
        this.cells = [];

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
        return true;
    }

    /**
     * Updates this chunk and all of its cells.  
     * Will be called on each frame to calculate the next frame.
     */
    update()
    {
        this.cells.forEach(cell => {
            cell.update();
        });
    }
}

module.exports = Chunk;
