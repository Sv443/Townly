import { Position } from "../../../../engine/base/Base";
import Electricity from "../../needs/Electricity";
import NeedyCell from "../../NeedyCell";


/**
 * 
 */
export default class Residential extends NeedyCell
{
    constructor(pos: Position)
    {
        super("residential", "Residential", pos, "R", {
            baseCost: 100,
            costIncrement: 1.002
        }, {
            max: { residents: 10 }
        });

        this.addNeed(new Electricity());
    }

    toString(): string
    {
        return `Residential Cell with ${this.getResidentsAmount()} residents @ ${this.getPosition().toString()} - UID: ${this.uid.toString()}`;
    }

    update(): Promise<void>
    {
        return new Promise(async res => {
            const needsStatus = await this.checkNeeds();

            if(needsStatus.unfulfilled.length === 0) // TODO: check cell age as well + maybe add some mild randomness to when cells level up
                this.levelUp();

            return res();
        });
    }

    bulldoze(): boolean
    {
        return true;
    }

    //#MARKER other

    getResidentsAmount(): number
    {
        return this.inhabitants.max?.residents || 0;
    }
}
