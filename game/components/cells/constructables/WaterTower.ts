import { Color, Position } from "../../../../engine/base/Base";
import InfluentialCell from "../../InfluentialCell";


/**
 * The water tower currently generates a lot of water.  
 * In the future, pipes should distribute the water throughout the city.
 */
export default class WaterTower extends InfluentialCell
{
    constructor(pos: Position)
    {
        super("special", "Water Tower", pos, "≈", {
            baseCost: 2000,
            costIncrement: 1.1
        },
        {
            type: "existance"
        });

        this.setColor("foreground", Color.Yellow);
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
