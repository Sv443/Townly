import { gameSettings } from "../settings";

import { GameLoop } from "../engine/base/GameLoop";
import { Grid, GridOptions } from "../engine/components/Grid";
import { Size } from "../engine/base/Base";


var gameLoop: GameLoop;
var grid: Grid;

/**
 * Initializes the game controller
 */
export function init()
{
    return new Promise<void>(async (res, rej) => {
        gameLoop = new GameLoop(gameSettings.loop.targetTps);

        gameLoop.on("tick", onTick);


        const gridOpts: GridOptions = {

        };

        grid = new Grid(new Size(20, 20), gridOpts);


        return res();
    });
}

async function onTick()
{
    grid.update();
}