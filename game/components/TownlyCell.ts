import { Color, Position } from "../../engine/core/BaseTypes";
import Cell from "../../engine/components/Cell";


/**
 * Describes the base type of the cell.  
 *   
 * | Type | Description |
 * | :-- | :-- |
 * | `land` | Land area that can be built on. TODO: It can also contain resources. |
 * | `water` | Normal buildings can't be built on water cells. |
 * | `residential` | A cell that residents live in. |
 * | `special` | Special buildings usually cost more, have a bulldoze confirmation prompt and they usually have special "abilities". |
 */
export type CellType = "land" | "water" | "residential" | "special";

/**
 * This cell class extends from Teng's Cell class.  
 * It contains stuff that is specific to Townly, like the cell type.
 */
export default abstract class TownlyCell extends Cell
{
    private type: CellType;


    /**
     * Creates an instance of the TownlyCell class
     * @param type The type of the cell
     * @param position The initial position of this cell
     * @param char This cell's representation as a single character
     */
    constructor(type: CellType, position: Position, char: string)
    {
        super(position, char);


        this.type = type;

        this.setColor("foreground", Color.White, true);
        this.setColor("background", Color.Black);
    }

    /**
     * Returns the type of this cell
     */
    getType(): CellType
    {
        return this.type;
    }
}
