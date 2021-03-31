import { DeepPartial } from "tsdef";

import { Position } from "../../engine/base/Base";
import { Constructable, IConstructableCost } from "./Constructable";
import { CellType } from "./TownlyCell";


//#MARKER types

export interface IInhabitants
{
    [index: string]: number | object | undefined;

    /** Max amount of inhabitants that this cell allows */
    max: {
        /** The base amount of residents that can live in this cell */
        residents: number;
        /** The base amount of workers that can work in this cell */
        workers: number;
    }
}

const defaultIInhabitants: IInhabitants = {
    max: {
        residents: 0,
        workers: 0
    }
};

//#MARKER class

/**
 * A Constructable is any cell that can be constructed by the player.  
 * They usually cost a certain amount of money.
 */
export abstract class InhabitedCell extends Constructable
{
    private inhabitants: DeepPartial<IInhabitants>;

    private level = 1;


    constructor(cellType: CellType, pos: Position, char: string, cost: DeepPartial<IConstructableCost>, inhabitants: DeepPartial<IInhabitants>)
    {
        super(cellType, pos, char, cost);


        this.inhabitants = { ...defaultIInhabitants, ...inhabitants };
    }

    /**
     * Returns the level of this InhabitedCell
     */
    getLevel(): number
    {
        return this.level;
    }

    /**
     * Sets the level of this InhabitedCell
     */
    setLevel(level: number): void
    {
        this.level = level;
    }

    /**
     * Levels up this InhabitedCell
     */
    levelUp(): void
    {
        this.setLevel(this.getLevel() + 1);
    }
}
