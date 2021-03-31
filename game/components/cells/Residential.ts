import { Position } from "../../../engine/base/Base";
import { Electricity } from "../needs/Electricity";
import { NeedyCell } from "../NeedyCell";
import { CellType } from "../TownlyCell";



/**
 * 
 */
export class Residential extends NeedyCell
{
    constructor(pos: Position)
    {
        super(CellType.Residential, pos, "R", {
            baseCost: 100,
            costIncrement: 1.002
        }, {
            max: { residents: 10 }
        });

        this.addNeed(new Electricity());
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
}
