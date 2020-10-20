//#SECTION Smooth LayeredNoise
//#SECTION LayeredNoise Test
const LayeredNoise = require("./src/classes/LayeredNoise");

const scl = require("svcorelib");
const Grid = require("./src/classes/Grid");
const Cell = require("./src/classes/Cell");
const Position = require("./src/classes/Position");
const col = scl.colors.fg;

let addT = 0, renderT = 0;
let lastSeed = 0;

const zenGenInterval = 10; // in seconds
const cursorPreview = true;
const extraSmooth = true;

const verPadding = 1;
const horPadding = 0;

const lnWidth = (process.stdout.columns - (2 * horPadding));
const lnHeight = (process.stdout.rows - (2 * verPadding));


//#SECTION ZenGen
function smoothPerlin(seed, passes, extraSmooth)
{
    // let ln = new LayeredNoise(150, 50);
    // let ln = new LayeredNoise(220, 30);
    // let ln = new LayeredNoise(233, 69); // 16:9 Fullscreen
    // let ln = new LayeredNoise(424, 114); // 4k
    // let ln = new LayeredNoise(230, 65); // Mac Pro 15"

    let ln = new LayeredNoise(lnWidth, lnHeight);

    addT = new Date().getTime();
    ln.addLayer("perlin", seed, 2.5);

    console.log(`\n\n${ln.seeds[0]}`);

    renderT = new Date().getTime();
    
    /** @type {Cell[][]} */
    let cells = [];
    
    ln.layers[0].forEach((valX, x) => {
        scl.unused(valX);
        cells.push([]);

        valX.forEach((valY, y) => {
            let cell = new Cell("land", new Position(x, y));

            if(valY < 0.4)
                cell.setType("deepwater");
            else if(valY < 0.5)
                cell.setType("water");
            else if(valY < 0.575)
                cell.setType("land");
            else
                cell.setType("forest");

            cells[x][y] = cell;
        });
    });

    if(passes > 0)
        Grid.smoothGrid(cells, passes, extraSmooth);
    
    const cursorPos = [scl.randRange(0, 200), scl.randRange(0, 50)];

    let lastCellType = null;
    let drawCursor = 0;
    let colChanges = 0;

    cells.forEach((row, x) => {
        // process.stdout.write("  ");
        row.forEach((cell, y) => {
            switch(cell.type)
            {
                case "water":
                    cell.char = "░";
                    cell.setColors("blue", "blue");
                break;
                case "deepwater":
                    cell.char = "░";
                    cell.setColors("blue", "black");
                break;
                case "forest":
                    cell.char = "▒";
                    cell.setColors("green", "black");
                break;
                case "land":
                    cell.char = "█";
                    cell.setColors("green", "green");
                break;
            }

            if(cursorPreview && x == cursorPos[1] && y == cursorPos[0])
            {
                cell.setColors("magenta", "magenta");
                drawCursor = 1;
            }

            if(cell.type != lastCellType || drawCursor == 1 || drawCursor == 3)
            {
                lastCellType = cell.type;

                if(drawCursor == 1)
                    drawCursor = 2;
                
                colChanges++;
                process.stdout.write(`${col.rst}${cell.getColors(true).bg}${cell.getColors(true).fg}${cell.char}`);

                if(drawCursor == 3)
                    drawCursor = 0;
            }
            else
            {
                process.stdout.write(cell.char);
            }

            if(drawCursor == 2)
            {
                drawCursor = 3;
                process.stdout.write(col.rst);
            }
        });

        if(x != (cells.length - 1))
        {
            process.stdout.write(`${col.rst}\n`);
            drawCursor = 3;
        }
    });

    process.stdout.write(col.rst + "\n");

    scl.unused(colChanges);
    // console.log(`${colChanges} color changes`);
}


function ZenGen()
{
    addT = 0;
    renderT = 0;

    smoothPerlin(null, 10, extraSmooth);

    // console.log(`Seed: ${lastSeed} - Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);
}

console.clear();

// smoothPerlin(2486795908441090, 250);
// smoothPerlin(1234, 4);

setInterval(() => ZenGen(), zenGenInterval * 1000);
ZenGen();

scl.unused(addT, renderT);



// //#SECTION Grid Test
// const Grid = require("./src/classes/Grid");

// let g = new Grid(100, 40);

// g.generateMap("Lakes", 1234);



// //#SECTION LayeredNoise Test
// // const LayeredNoise = require("./src/classes/LayeredNoise");

// // const scl = require("svcorelib");
// // const col = scl.colors.fg;

// // let ln = new LayeredNoise(150, 50);
// // let ln = new LayeredNoise(220, 30);
// let ln = new LayeredNoise(lnWidth, lnHeight); // 16:9 Fullscreen
// // let ln = new LayeredNoise(426, 100); // 4k
// // let ln = new LayeredNoise(230, 62); // Mac Pro 15"

// // let addT = 0, renderT = 0;


// function perlin(seed)
// {
//     addT = new Date().getTime();
//     ln.addLayer("perlin", seed, 4.5);

//     renderT = new Date().getTime();

//     process.stdout.write("\n");
//     ln.layers[0].forEach(x => {
//         process.stdout.write("  ");
//         x.forEach(y => {
//             if(y < 0.4)
//                 process.stdout.write(`${col.blue}░${col.rst}`);
//             else if(y < 0.5)
//                 process.stdout.write(`${col.blue}▒${col.rst}`);
//             else if(y < 0.6)
//                 process.stdout.write(`${col.green}█${col.rst}`);
//             else
//                 process.stdout.write(`${col.green}▒${col.rst}`);
//         });
//         process.stdout.write("\n");
//     });
// }

// function simplex(seed)
// {
//     addT = new Date().getTime();
//     ln.addLayer("simplex", seed, 3.0);

//     renderT = new Date().getTime();

//     process.stdout.write("\n");
//     ln.layers[0].forEach(x => {
//         process.stdout.write("  ");
//         x.forEach(y => {
//             if(y < 0.2)
//                 process.stdout.write(`${col.blue}░${col.rst}`);
//             else if(y < 0.45)
//                 process.stdout.write(`${col.blue}▒${col.rst}`);
//             else if(y < 0.65)
//                 process.stdout.write(`${col.green}█${col.rst}`);
//             else
//                 process.stdout.write(`${col.green}▒${col.rst}`);
//         });
//         process.stdout.write("\n");
//     });
// }


// function simplex2(seed)
// {
//     addT = new Date().getTime();
//     ln.addLayer("simplex2", seed, 5.5);

//     renderT = new Date().getTime();

//     process.stdout.write("\n");
//     ln.layers[0].forEach(x => {
//         process.stdout.write("  ");
//         x.forEach(y => {
//             if(y < 0.35)
//                 process.stdout.write(`${col.blue}░${col.rst}`);
//             else if(y < 0.6)
//                 process.stdout.write(`${col.blue}▒${col.rst}`);
//             else
//                 process.stdout.write(` `);
//         });
//         process.stdout.write("\n");
//     });
// }

// function opensimplex(seed)
// {
//     addT = new Date().getTime();
//     ln.addLayer("opensimplex", seed, 1);
//     ln.addLayer("opensimplex", seed * 2, 4);
//     ln.addLayer("opensimplex", seed * 3, 8);
//     ln.addLayer("opensimplex", seed * 4, 10);

//     renderT = new Date().getTime();

//     process.stdout.write("\n");
//     // ln.layers[0].forEach(x => {
//     ln.generateNoiseMap().forEach(x => {
//         process.stdout.write("  ");
//         x.forEach(y => {
//             if(y.value < 0.135)
//                 process.stdout.write(`${col.green}░${col.rst}`);
//             else if(y.value < 0.45)
//                 process.stdout.write(`${col.green}▒${col.rst}`);
//             else if(y.value < 0.65)
//                 process.stdout.write(`${col.blue}█${col.rst}`);
//             else
//                 process.stdout.write(`${col.blue}▒${col.rst}`);
//         });
//         process.stdout.write("\n");
//     });
// }


// opensimplex(123);
// scl.unused(perlin, simplex, simplex2);

// console.log(`Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);


//#SECTION open-simplex-noise

// const { makeNoise2D } = require("open-simplex-noise");


// let noise2d = makeNoise2D(Date.now());
// let res = 10;

// for(let x = 0; x < lnHeight; x++)
// {
//     for(let y = 0; y < lnWidth; y++)
//     {
//         let val = noise2d(x / res, y / res);
        
//         if(val > 0.7)
//             process.stdout.write(`${col.red}x${col.rst}`);
//         else if(val > 0.6)
//             process.stdout.write(`${col.yellow}x${col.rst}`);
//         else if(val > 0.5)
//             process.stdout.write(`${col.blue}x${col.rst}`);
//         else if(val > 0.4)
//             process.stdout.write(`${col.green}x${col.rst}`);
//         else if(val > 0.3)
//             process.stdout.write(`${col.cyan}x${col.rst}`);
//         else if(val > 0.2)
//             process.stdout.write(`${col.magenta}x${col.rst}`);
//         else
//             process.stdout.write(`${col.white}x${col.rst}`);
//     }
//     process.stdout.write("\n");
// }
