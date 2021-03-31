import { ColorType, Color, Position } from "../../engine/base/Base";
import { Cell } from "../../engine/components/Cell";


/**
 * Describes the base type of the cell
 */
export enum CellType
{
    Land,
    Water,
    Residential
}

/**
 * This cell class extends from Teng's Cell class.  
 * It contains stuff that is specific to Townly, like the cell type.
 */
export abstract class TownlyCell extends Cell
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

        this.setColor(ColorType.Foreground, Color.White, true);
        this.setColor(ColorType.Background, Color.Black);
    }

    /**
     * Returns the type of this cell
     */
    getType(): CellType
    {
        return this.type;
    }
}
