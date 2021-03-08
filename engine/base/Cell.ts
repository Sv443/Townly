import { Position } from "./Base";


export type CellType = "land" | "water" | "resource";

/**
 * Describes a single cell.  
 * Cells have to be contained in a Grid or Chunk.
 */
export abstract class Cell
{
    private type: CellType;
    private position: Position;


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

    //#MARKER getters
    getType(): CellType
    {
        return this.type;
    }

    getPosition(): Position
    {
        return this.position;
    }
}