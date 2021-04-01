import { Position } from "../../../engine/base/Base";
import { InfluentialCell } from "../InfluentialCell";
import { FulfillmentType } from "../Need";
import { CellType } from "../TownlyCell";




/**
 * The substation currently generates a lot of electricity.  
 * In the future it should just extend the radius of electricity generating buildings.
 */
export class Substation extends InfluentialCell
{
    constructor(pos: Position)
    {
        super(CellType.Special, pos, "🗲", {
            baseCost: 4000,
            costIncrement: 1.1
        },
        {
            type: FulfillmentType.Existance
        });
    }

    //#MARKER other

    bulldoze()
    {
        return true;
    }

    update(): Promise<void>
    {
        return new Promise(res => {
            return res();
        });
    }
}
