import { unused } from "svcorelib";
import { Position } from "../../../engine/base/Base";
import StructuralCell from "./StructuralCell";


export default class Water extends StructuralCell
{
    /** Whether or not this water is deep (duh) */
    private deep: boolean;


    constructor(position: Position, deep: boolean = false)
    {
        super("water", position, "▒");

        this.deep = deep;

        if(this.deep)
            this.char = "░";
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
            // Water cells can't be bulldozed:
            return res(false);
        });
    }

    //#MARKER other

    /**
     * Whether or not this water is deep
     */
    isDeep(): boolean
    {
        return this.deep;
    }

    /**
     * Changes if this water is deep or not
     */
    setDeep(deep: boolean): void
    {
        this.deep = deep;
    }
}
