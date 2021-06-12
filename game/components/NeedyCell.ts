import { DeepPartial } from "tsdef";

import { Position } from "../../engine/core/Base";
import { IConstructableCost } from "./Constructable";
import InhabitedCell, { IInhabitants } from "./InhabitedCell";
import Need from "./Need";
import { CellType } from "./TownlyCell";


export interface INeedFulfillment
{
    [index: string]: Need[];

    /** Needs that are fulfilled */
    fulfilled: Need[],
    /** Needs that aren't fulfilled */
    unfulfilled: Need[]
}

/**
 * A needy cell has certain needs that should be fulfilled.
 */
export default abstract class NeedyCell extends InhabitedCell
{
    protected needs: Need[] = [];


    /**
     * Creates an instance of the NeedyCell class
     */
    constructor(cellType: CellType, name: string, pos: Position, char: string, cost: DeepPartial<IConstructableCost>, inhabitants: DeepPartial<IInhabitants>, needs?: Need[])
    {
        super(cellType, name, pos, char, cost, inhabitants);


        if(needs)
            this.needs = needs;
    }

    /**
     * Adds a need to this cell
     */
    addNeed(need: Need): void
    {
        this.needs.push(need);
    }

    /** Returns the need of this cell that is matching the provided display name */
    getNeed(displayName: string): Need;
    /** Returns the need of this cell at the provided index */
    getNeed(index: number): Need;

    getNeed(id: string | number): Need | undefined
    {
        if(typeof id === "string")
            return this.needs.find(n => n.getDisplayName() === id);

        else if(typeof id === "number")
            return this.needs[id] || undefined;
    }

    /**
     * Returns all needs of this cell
     */
    getNeeds(): Need[]
    {
        return this.needs;
    }

    /**
     * Call this to check the needs' fulfillment
     */
    checkNeeds(): Promise<INeedFulfillment>
    {
        return new Promise(async res => {
            const needFulfillment: INeedFulfillment = {
                fulfilled: this.getNeeds(),
                unfulfilled: []
            };

            // TODO: check needs

            return res(needFulfillment);
        });
    }
}
