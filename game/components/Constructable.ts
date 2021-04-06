import { DeepPartial } from "tsdef";

import { Position } from "../../engine/base/Base";
import { CellType, TownlyCell } from "./TownlyCell";


//#MARKER types

export interface IConstructableCost
{
    [index: string]: number | undefined;

    /** The base cost for this Constructable */
    baseCost: number;
    /** The cost will multiply by this factor for every Constructable that already exists - set to `1.0` to disable, less than `1.0` to make it decrement */
    costIncrement: number;
}

const defaultIConstructableCost: IConstructableCost = {
    baseCost: 1000,
    costIncrement: 1.0
};

//#MARKER class

/**
 * A Constructable is any cell that can be constructed by the player.  
 * They usually cost a certain amount of money.
 */
export abstract class Constructable extends TownlyCell
{
    protected cost: IConstructableCost;

    readonly constructedAt: Date;


    constructor(cellType: CellType, pos: Position, char: string, cost: DeepPartial<IConstructableCost>)
    {
        super(cellType, pos, char);

        this.cost = { ...defaultIConstructableCost, ...cost };
        
        this.constructedAt = new Date();
    }

    /**
     * Returns the cost of this cell
     */
    getCost(): IConstructableCost
    {
        return this.cost;
    }

    /**
     * Set the cost of this cell
     */
    setCost(cost: IConstructableCost)
    {
        this.cost = cost;
    }
}
