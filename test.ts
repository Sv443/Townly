// import { diff } from "deep-diff";
import { colors, pause } from "svcorelib";
import { Area, Color, isColor, objectsEqual, Position, Size } from "./engine/base/Base";
import { GameLoop } from "./engine/base/GameLoop";
import { LayeredNoise } from "./engine/mapGen/LayeredNoise";
import { Cell, ICellColors } from "./engine/components/Cell";
import { Grid, IGridOptions } from "./engine/components/Grid";
import { Camera } from "./engine/display/Camera";
import { MainMenu } from "./engine/display/menus/MainMenu";
import { InputHandler } from "./engine/input/InputHandler";
import { Land } from "./game/components/cells/Land";
import { SaveState } from "./engine/serialization/SaveState";


// const chunkSize = new Size(20, 10);
// // const gridSize = new Size((process.stdout.columns || 10), (process.stdout.rows || 5));
// const gridSize = new Size(200, 50);

// console.log(`Grid size = ${gridSize.toString()}`);


// async function init()
// {
//     const opts: Partial<IGridOptions> = {
//         inputEnabled: true
//     };

//     const grid = new Grid(gridSize, undefined, opts);
//     console.log(`Created ${grid.toString()}`);

//     grid.devFill();

//     // update once to propagate cursor position
//     await grid.update();




//     const camInitial: ICameraInitialValues = {
//         position: new Position(0, 0),
//         viewportSize: gridSize
//     }

//     const cam = new Camera(camInitial);
//     console.log(`Created ${cam.toString()}`);

    
//     const gl = new GameLoop(20);
//     console.log(`Created ${gl.toString()}`);

//     gl.on("tick", async (num) => {
//         // console.log(`Tick #${num} - Calling cam.draw():\n`);
//         await cam.draw(grid);
//     });

//     console.log("");
// }

// init();


// async function test()
// {
//     const grid = new Grid(gridSize, chunkSize);

//     grid.devFill();

//     await grid.update();



//     const cam = new Camera(new Area(new Position(0, 0), new Position(gridSize.width - 1, gridSize.height - 1)));

//     await cam.draw(grid);

//     process.stdout.write("\n");

//     await pause();
// }

// test();





// declare interface SaveData {
//     foo: number;
//     bar: string;
//     baz: boolean;
// }

// async function saveTest()
// {
//     let save = new SaveState<SaveData>("./saves/", "MySave");
    
//     const saveData: SaveData = {
//         foo: 123,
//         bar: "hello",
//         baz: true
//     };

//     await save.setData(saveData);

//     await save.save();

//     console.log(save);
// }

// saveTest();


import { StatePromise, PromiseState } from "./engine/base/StatePromise";


function waitASecond()
{
    return new Promise<number>((res, rej) => {
        // async task that needs time to complete
        setTimeout(() => {
            // randomly resolve or reject, for demonstration:
            if(Math.floor(Math.random() * 2))
                return res(Math.floor(Math.random() * 10)); // return a random number as parameter, for demonstration
            else
                return rej(new Error("Hello, I am an error")); // return an error message
        }, 1000);
    });
}

async function promiseTest()
{
    // create a new StatePromise that should supervise the Promise returned by waitASecond():
    const statePromise = new StatePromise<number>(waitASecond());
    // get the StatePromise's state:
    let state = statePromise.getState();

    console.log(`BEGIN - state: ${PromiseState[state]} (${state})`);

    try
    {
        // exec actually runs the promise (waitASecond() in this case):
        const num = await statePromise.exec();
        // get the StatePromise's state:
        state = statePromise.getState();

        console.log(`DONE - state: ${PromiseState[state]} (${state}) - Random number: ${num}`);
    }
    catch(err)
    {
        // get the StatePromise's state:
        state = statePromise.getState();

        console.log(`REJECTED - state: ${PromiseState[state]} (${state}) - ${err}`);
    }
}

promiseTest();
