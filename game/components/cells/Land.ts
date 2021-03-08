import { Position } from "../../../engine/base/Base";
import { Cell } from "../../../engine/base/Cell";


export class Land extends Cell
{
    constructor(position: Position)
    {
        super("land", position);
    }
}