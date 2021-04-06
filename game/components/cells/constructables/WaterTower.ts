import { Color, ColorType, Position } from "../../../../engine/base/Base";
import { InfluentialCell } from "../../InfluentialCell";
import { FulfillmentType } from "../../Need";
import { CellType } from "../../TownlyCell";




/**
 * The water tower currently generates a lot of water.  
 * In the future, pipes should distribute the water throughout the city.
 */
export class WaterTower extends InfluentialCell
{
    constructor(pos: Position)
    {
        super(CellType.Special, pos, "≈", {
            baseCost: 2000,
            costIncrement: 1.1
        },
        {
            type: FulfillmentType.Existance
        });

        this.setColor(ColorType.Foreground, Color.Yellow);
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
