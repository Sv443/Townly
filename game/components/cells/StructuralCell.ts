import { Position } from "../../../engine/core/BaseTypes";
import TownlyCell, { CellType } from "../TownlyCell";


/**
 * A structural cell is used to give the playable area its structure
 */
export default abstract class StructuralCell extends TownlyCell
{
    constructor(type: CellType, position: Position, char: string)
    {
        super(type, position, char);
    }
}
