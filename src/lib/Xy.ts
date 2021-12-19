import { Actor } from "excalibur";
import { Color, CollisionType, Engine } from "excalibur";

export class Xy extends Actor {
    constructor()
    {
        console.log("Construct Xy");
        super({
            x: 50,
            y: 50,
            width: 50,
            height: 50,
            color: Color.Chartreuse,
            collisionType: CollisionType.Fixed,
        });
    }

    onInitialize(engine: Engine)
    {
        console.log("Init Xy");
        return;
    }

    update(engine: Engine, delta: number)
    {
        super.update(engine, delta);
        console.log(`Update - delta: ${delta}`);
    }
}
