import { DeepPartial } from "tsdef";
import { colors } from "svcorelib";

import { gameSettings } from "../settings";

import { dbg, LogLevel, Newable, Position, Size } from "../engine/base/Base";
import { Grid, IGridOptions } from "../engine/components/Grid";
import { GameLoop } from "../engine/base/GameLoop";

import { Constructable } from "./components/Constructable";
import { Residential } from "./components/cells/constructables/Residential";
import { Substation } from "./components/cells/constructables/Substation";
import { WaterTower } from "./components/cells/constructables/WaterTower";


const col = colors.fg;

let gameLoop: GameLoop;
let grid: Grid;

/**
 * All cells that can be constructed by the player
 */
const constructables: Constructable[] = [];

/**
 * Initializes the game controller
 */
export function init()
{
    return new Promise<void>(async (res, rej) => {
        // register all constructables
        await registerConstructables();

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

/**
 * Goes through a list of constructable classes, instantiates them and overwrites them onto `constructables`.  
 * TODO: maybe load these dynamically, by reading the filesystem
 */
function registerConstructables(): Promise<void>
{
    return new Promise(async (res) => {
        // clear array
        constructables.splice(0, constructables.length);

        // all instantiatable Constructable classes
        const cnstr: Newable<Constructable>[] = [
            Residential,
            Substation,
            WaterTower
        ];

        // go through the Constructable classes, instantiating them and pushing them to `constructables`
        cnstr.forEach(ConstructableClass => {
            const c = new ConstructableClass(new Position(-1, -1));

            dbg("Init/Constructables", `Registered constructable ${col.green}${c.name}${col.rst}`, LogLevel.Success);

            constructables.push(c);
        });

        return res();
    });
}

/**
 * Tries to get an instantiated constructable via the passed class reference
 */
function getConstructable(ConstructableClass: Newable<Constructable>): Constructable | undefined
{
    return constructables.find(cs => cs instanceof ConstructableClass);
}
