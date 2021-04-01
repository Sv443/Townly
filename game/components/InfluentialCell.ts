import { DeepPartial } from "tsdef";

import { Position } from "../../engine/base/Base";
import { Constructable, IConstructableCost } from "./Constructable";
import { FulfillmentType } from "./Need";
import { CellType } from "./TownlyCell";


//#MARKER types

export interface IInfluenceSettings
{
    /** How this cell influences cells around it */
    type: FulfillmentType;
    /** Radius of influence in cells - Only needed if type = Range */
    radius?: number;
}

const defaultIInfluenceSettings: IInfluenceSettings = {
    type: FulfillmentType.Existance,
    radius: 10,
};

//#MARKER class

/**
 * This cell fulfills needs, either in a radius or by simply existing, depending on its set type
 */
export abstract class InfluentialCell extends Constructable
{
    protected influenceSettings: DeepPartial<IInfluenceSettings>;


    constructor(cellType: CellType, pos: Position, char: string, cost: DeepPartial<IConstructableCost>, influenceSettings: IInfluenceSettings)
    {
        super(cellType, pos, char, cost);


        this.influenceSettings = { ...defaultIInfluenceSettings, ...influenceSettings };
    }

    toString(): string
    {
        return `InfluentialCell '${this.getChar()}' of fulfillment type ${FulfillmentType[this.getFulfillmentType()]} @ ${this.getPosition().toString()} - UID: ${this.uid.toString()}`
    }

    /**
     * Returns the fulfillment type
     */
    getFulfillmentType(): FulfillmentType
    {
        return (this.influenceSettings as IInfluenceSettings).type;
    }

    /**
     * Returns the fulfillment radius - Returns `NaN` if no radius was set
     */
    getFulfillmentRadius(): number
    {
        return (this.influenceSettings as IInfluenceSettings).radius || NaN;
    }
}
