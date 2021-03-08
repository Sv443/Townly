import { Position } from "../base/Base";

/**
 * Describes the base type of the cell
 */
export enum CellType
{
    Land,
    Water,
    Resource
}


/**
 * Describes a single cell.  
 * Cells have to be contained in a Grid or Chunk.
 */
export abstract class Cell
{
    private type: CellType;
    private position: Position;

    private cursorActive: boolean = false;


    /**
     * Constructs a new instance of the Cell class
     * @param type The type of cell
     * @param position The position of the cell inside its parent container
     */
    constructor(type: CellType, position: Position)
    {
        this.type = type;
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
     * Returns the type of this cell
     */
    getType(): CellType
    {
        return this.type;
    }

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