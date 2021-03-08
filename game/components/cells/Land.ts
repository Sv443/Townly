import { Position } from "../../../engine/base/Base";
import { Cell } from "../../../engine/components/Cell";


export class Land extends Cell
{
    constructor(position: Position)
    {
        super("land", position);
    }
}