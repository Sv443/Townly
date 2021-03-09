import { Position } from "../../../engine/base/Base";
import { TownlyCell, CellType } from "../TownlyCell";


export class Land extends TownlyCell
{
    constructor(position: Position)
    {
        super(CellType.Land, position, " ");
    }

    update(): Promise<void>
    {
        return new Promise<void>(async (res, rej) => {
            // TODO: some update stuff? idk

            return res();
        });
    }
}