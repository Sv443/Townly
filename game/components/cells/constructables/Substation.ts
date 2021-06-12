import { Color, Position } from "../../../../engine/core/Base";
import InfluentialCell from "../../InfluentialCell";


/**
 * The substation currently generates a lot of electricity.  
 * In the future it should just extend the radius of electricity generating buildings.
 */
export default class Substation extends InfluentialCell
{
    constructor(pos: Position)
    {
        super("special", "Substation", pos, "⭍", {
            baseCost: 4000,
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
