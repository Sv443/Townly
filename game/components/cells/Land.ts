import { Position } from "../../../engine/base/Base";
import { TownlyCell, CellType } from "../TownlyCell";


export class Land extends TownlyCell
{
    constructor(position: Position)
    {
        super(CellType.Land, position, " ");
    }
}