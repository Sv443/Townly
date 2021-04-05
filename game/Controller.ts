import { gameSettings } from "../settings";
import { DeepPartial } from "tsdef";

import { GameLoop } from "../engine/base/GameLoop";
import { Grid, IGridOptions } from "../engine/components/Grid";
import { Size } from "../engine/base/Base";


let gameLoop: GameLoop;
let grid: Grid;

/**
 * Initializes the game controller
 */
export function init()
{
    return new Promise<void>(async (res, rej) => {
        gameLoop = new GameLoop(gameSettings.loop.targetTps);

        gameLoop.on("tick", onTick);


        const gridOpts: DeepPartial<IGridOptions> = {

        };

        //#DEBUG temporary:
        grid = new Grid(new Size(20, 20), new Size(10, 5), undefined, gridOpts);


        return res();
    });
}

/**
 * Called on each tick of the game
 */
async function onTick()
{
    await grid.update();
}
