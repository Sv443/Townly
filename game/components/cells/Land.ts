import { unused } from "svcorelib";

import { Position } from "../../../engine/core/BaseTypes";
import StructuralCell from "./StructuralCell";


export default class Land extends StructuralCell
{
    constructor(position: Position)
    {
        super("land", position, "█");
    }

    /**
     * Gets called on each tick of the game
     */
    update(): Promise<void>
    {
        return new Promise<void>(async (res, rej) => {
            unused(rej);

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
