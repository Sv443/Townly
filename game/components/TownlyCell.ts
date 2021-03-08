import { Position } from "../../engine/base/Base";
import { Cell } from "../../engine/components/Cell";


/**
 * Describes the base type of the cell
 */
export enum CellType
{
    Land,
    Water
}


export abstract class TownlyCell extends Cell
{
    private type: CellType;

    /**
     * Creates an instance of the TownlyCell class
     * @param type The type of the cell
     * @param position The initial position of this cell
     */
    constructor(type: CellType, position: Position)
    {
        super(position);

        this.type = type;
    }

    /**
     * Returns the type of this cell
     */
    getType(): CellType
    {
        return this.type;
    }
}