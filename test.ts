// import { diff } from "deep-diff";
// import { colors, pause } from "svcorelib";
// import { Area, Color, isColor, objectsEqual, Position, Size } from "./engine/base/Base";
// import { GameLoop } from "./engine/base/GameLoop";
// import { LayeredNoise } from "./engine/mapGen/LayeredNoise";
// import { Cell, ICellColors } from "./engine/components/Cell";
// import { Grid, IGridOptions } from "./engine/components/Grid";
// import { Camera } from "./engine/display/Camera";
// import { MainMenu } from "./engine/display/menus/MainMenu";
// import { InputHandler } from "./engine/input/InputHandler";
// import { Land } from "./game/components/cells/Land";
// import { SaveState } from "./engine/serialization/SaveState";
// import { Size } from "./engine/base/Base";


// const chunkSize = new Size(20, 10);
// const gridSize = new Size((process.stdout.columns || 10), (process.stdout.rows || 5));
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


// import { StatePromise, PromiseState } from "./engine/base/StatePromise";
// import { randRange } from "svcorelib";


// function waitASecond()
// {
//     return new Promise<number>((res, rej) => {
//         // async task that needs time to complete
//         setTimeout(() => {
//             // randomly resolve or reject, for demonstration:
//             const resolve = (randRange(0, 1) === 1);

//             if(resolve)
//             {
//                 // return a random number as parameter, for demonstration:
//                 const randNum = randRange(0, 100);
//                 return res(randNum);
//             }
//             else
//                 return rej(new Error("Hello, I am an error")); // return an error message
//         }, 1000);
//     });
// }

// async function promiseTest()
// {
//     // create a new StatePromise that should supervise the Promise returned by waitASecond():
//     const statePromise = new StatePromise<number>(waitASecond());
//     // get the StatePromise's state:
//     let state = statePromise.getState();

//     console.log(`BEGIN - state: ${PromiseState[state]} (${state})`);

//     try
//     {
//         // exec actually runs the promise (waitASecond() in this case):
//         const num = await statePromise.exec();
//         // get the StatePromise's state:
//         state = statePromise.getState();

//         console.log(`DONE - state: ${PromiseState[state]} (${state}) - Random number: ${num}`);
//     }
//     catch(err)
//     {
//         // get the StatePromise's state:
//         state = statePromise.getState();

//         console.log(`REJECTED - state: ${PromiseState[state]} (${state}) - ${err}`);
//     }
// }

// promiseTest();




// import { Audio, Track } from "./engine/audio/Audio";
// import { CycleMode, Playlist } from "./engine/audio/Playlist";


// async function audioTest()
// {
//     const tracks: Track[] = [
//         {
//             name: "Olivier",
//             instance: new Audio("./game/assets/audio/music/Olivier - Wintergatan Vol2.mp3")
//         },
//         {
//             name: "Prototype",
//             instance: new Audio("./game/assets/audio/music/Prototype - Wintergatan Vol2.mp3")
//         },
//         {
//             name: "Sandviken Stradivarius",
//             instance: new Audio("./game/assets/audio/music/Sandviken Stradivarius - Wintergatan Vol2.mp3")
//         }
//     ];

//     const pl = new Playlist(CycleMode.Off, tracks);

//     await pl.loadMetadata();

//     const tri = pl.getTrack("Sandviken Stradivarius")?.instance;

//     if(tri)
//     {
//         tri.setVolume(0.05);

//         // await tri.play();

//         console.log("done");
//     }

//     console.log();
// }

// audioTest();




// import { GameLoop, IGameLoopSettings } from "./engine/base/GameLoop";


// const glSettings: Partial<IGameLoopSettings> = {
//     desyncEventThreshold: 20
// };

// const gl = new GameLoop(10, glSettings);

// console.log();
// console.log(`Tick interval: ${gl.getTickInterval()}ms`);
// console.log(`Target TPS:    ${gl.getTargetTPS()}`);
// console.log();

// gl.on("tick", (numTicks: number) => {
//     console.log(`Tick #${numTicks}`);
// });

// gl.on("desync", (target: number, actual: number) => {
//     console.log(`DESYNC: expected ${target} - got ${actual}`);

//     setTimeout(() => {
//         process.exit();
//     }, 1000);
// });




// import { colors, seededRNG } from "svcorelib";
// import { LayeredNoise, LayerImportanceFormula } from "./engine/noise/LayeredNoise";
// import { Algorithm, NoiseLayer } from "./engine/noise/NoiseLayer";


// async function noiseTest()
// {
//     console.log();

//     const mapSize = new Size(150, 50);

//     const seed = seededRNG.generateRandomSeed(10).toString();
//     console.log(`Seed: ${seed}`);


//     const ln = new LayeredNoise(mapSize);

//     const layers: NoiseLayer[] = [
//         new NoiseLayer(mapSize, Algorithm.Perlin, { seed, resolution: 50 }),
//         new NoiseLayer(mapSize, Algorithm.Perlin, { seed, resolution: 35 }),
//         new NoiseLayer(mapSize, Algorithm.Perlin, { seed, resolution: 20 }),
//     ];

//     layers.forEach(layer => ln.addLayer(layer));


//     // // example formula: https://www.desmos.com/calculator/yvqff9uusj
//     // const fn: LayerImportanceFormula = (cur, last, amt) => {
//     //     let val = Math.sqrt(cur) * -0.5 + 1;

//     //     if(val < 0.0)
//     //         val = 0.0;

//     //     return val;
//     // };

//     // ln.setImportanceFormula(fn);


//     const noiseMap = await ln.generateMap();


//     console.log(`\n\nNoise Map:`);

//     const toColoredChar = (val: number) => {
//         switch(val)
//         {
//             case 3:  return `${colors.fg.black}~${colors.rst}`;
//             case 4:  return `${colors.fg.blue}~${colors.rst}`;
//             case 5:  return `${colors.fg.cyan}~${colors.rst}`;
//             case 6:  return `${colors.fg.yellow}▒${colors.rst}`;
//             case 7:  return `${colors.fg.green}▓${colors.rst}`;
//             default: return `${colors.fg.white}-${colors.rst}`;
//         }
//     }

//     noiseMap.forEach(row => {
//         console.log(row.map(v => toColoredChar(parseInt((v * 10).toFixed(0)))).join(""));
//     });

//     console.log("\nend.\n");
// }

// noiseTest();







// import { Cursor } from "ansi";


// async function cursorTest()
// {
//     const cursor = new Cursor(process.stdout);

//     cursor.beep();
// }

// cursorTest();





// import { linear } from "./engine/math/Interpolation";


// async function testInterpolation()
// {
//     console.log(linear(1, -100, 100));
// }

// testInterpolation();



// import { seededRNG } from "svcorelib";

// import { Area, Position, Size } from "./engine/base/Base";
// import { Chunk } from "./engine/components/Chunk";
// import { Grid, IGridOptions } from "./engine/components/Grid";
// import { TownlyCell } from "./game/components/TownlyCell";
// import { MapGen, MapPreset } from "./game/world/MapGen";


// async function testCellMapGen()
// {
//     const preset = MapPreset.Debug;
//     const mapSize = new Size(process.stdout.columns, process.stdout.rows - 5);

//     const seed = seededRNG.generateRandomSeed(10);
//     // const seed = 5370703259;

//     const map = await MapGen.generate(mapSize, preset, seed);

//     const chunkIdx = new Position(0, 0);
//     const chunk = new Chunk(chunkIdx, Area.fromChunkIndex(chunkIdx, mapSize), map);


//     const gridOpts: Partial<IGridOptions> = {
//         inputEnabled: false
//     };

//     const grid = new Grid(mapSize, mapSize, [[chunk]], gridOpts);




//     const cells: TownlyCell[][] = (grid.getCells(chunkIdx) as TownlyCell[][]);


//     const printRows: string[] = [];

//     cells.forEach((row) => {
//         const printRow: string[] = [];

//         row.forEach((cell) => {
//             printRow.push(cell.getChar());
//         });

//         printRows.push(printRow.join(""));
//     });

//     process.stdout.write(`${printRows.join("\n")}\n`);

//     console.log(`\nSeed: ${seed}\n`);
// }


// setInterval(() => testCellMapGen(), 5000);
// testCellMapGen();





import { MainMenu } from "./engine/display/menus/MainMenu";


async function mainMenuTest()
{
    const mm = new MainMenu("Townly", undefined, "Script");

    mm.addOption("test");
    mm.addOption("succ");

    await mm.preload();

    console.log(mm.getFIGTitle().join("\n"));

    // const selectedOption = await mm.show();

    // setImmediate(() => console.log(`Selected ${mm.getOptions()[selectedOption]}`));
}

mainMenuTest();
