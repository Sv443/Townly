import { Position } from "../../../engine/base/Base";
import { TownlyCell, CellType } from "../TownlyCell";


export class Land extends TownlyCell
{
    constructor(position: Position)
    {
        super(CellType.Land, position, "█");
    }

    /**
     * Gets called on each tick of the game
     */
    update(): Promise<void>
    {
        return new Promise<void>(async (res, rej) => {
            return res();
        });
    }

    bulldoze(): Promise<boolean>
    {
        return new Promise<boolean>(async (res) => {
            // Land cells can't be bulldozed:
            return res(false);
        });
    }
}
