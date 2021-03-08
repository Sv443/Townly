import { Position } from "../base/Base";


/**
 * Describes a single cell.  
 * Cells have to be contained in a Grid or Chunk.
 */
export abstract class Cell
{
    private position: Position;

    private cursorActive: boolean = false;


    /**
     * Constructs a new instance of the Cell class
     * @param position The position of the cell inside its parent container
     */
    constructor(position: Position)
    {
        this.position = position;
    }

    //#MARKER methods / setters
    /**
     * Sets the state of the cursor
     * @param active
     */
    setCursorActive(active: boolean): void
    {
        this.cursorActive = active;
    }

    //#MARKER getters
    /**
     * Returns the position of this cell in its parent grid
     */
    getPosition(): Position
    {
        return this.position;
    }

    /**
     * Returns the current state of the cursor
     */
    getCursorActive(): boolean
    {
        return this.cursorActive;
    }
}