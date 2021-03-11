// import { diff } from "deep-diff";
import { colors } from "svcorelib";
import { Area, Color, isColor, objectsEqual, Position, Size } from "./engine/base/Base";
import { GameLoop } from "./engine/base/GameLoop";
import { LayeredNoise } from "./engine/base/mapGen/LayeredNoise";
import { Cell, ICellColors } from "./engine/components/Cell";
import { Grid, IGridOptions } from "./engine/components/Grid";
import { Camera, ICameraInitialValues } from "./engine/display/Camera";
import { MainMenu } from "./engine/display/menus/MainMenu";
import { Land } from "./game/components/cells/Land";



const gridSize = new Size(process.stdout.columns, process.stdout.rows - 4);

console.log(`Grid size = ${gridSize.toString()}`);


async function init()
{
    const opts: IGridOptions = {

    };

    const grid = new Grid(gridSize, opts);

    console.log(`Created ${grid.toString()}`);

    grid.devFill();





    const camInitial: ICameraInitialValues = {
        position: new Position(0, 0),
        viewportSize: gridSize
    }

    const cam = new Camera(camInitial);

    console.log(`Created ${cam.toString()}`);

    console.log(`Calling cam.draw():\n`);

    await cam.draw(grid);

    console.log("");
}

init();
