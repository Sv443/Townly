import { Position } from "../../../engine/base/Base";
import { Cell, CellType } from "../../../engine/components/Cell";


export class Land extends Cell
{
    constructor(position: Position)
    {
        super(CellType.Land, position);
    }
}