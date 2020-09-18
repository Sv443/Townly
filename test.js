//#SECTION Smooth LayeredNoise
//#SECTION LayeredNoise Test
const LayeredNoise = require("./src/classes/LayeredNoise");

const scl = require("svcorelib");
const Grid = require("./src/classes/Grid");
const Cell = require("./src/classes/Cell");
const col = scl.colors.fg;

let addT = 0, renderT = 0;
let lastSeed = 0;


const cursorPreview = true;
const extraSmooth = true;


function smoothPerlin(seed, passes, extraSmooth)
{
    // let ln = new LayeredNoise(150, 50);
    // let ln = new LayeredNoise(220, 30);
    // let ln = new LayeredNoise(233, 69); // 16:9 Fullscreen
    // let ln = new LayeredNoise(424, 114); // 4k
    // let ln = new LayeredNoise(230, 65); // Mac Pro 15"

    let verPadding = 0;
    let horPadding = 0;

    let ln = new LayeredNoise((process.stdout.columns - (2 * horPadding)), (process.stdout.rows - (2 * verPadding)));

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
            let cell = new Cell("land");

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
    });

    process.stdout.write(col.rst + "\n");
    console.log(colChanges);
}


function ZenGen()
{
    addT = 0;
    renderT = 0;

    smoothPerlin(null, 8, extraSmooth);

    // console.log(`Seed: ${lastSeed} - Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);
}

console.clear();

// smoothPerlin(2486795908441090, 250);
// smoothPerlin(1234, 4);

setInterval(() => ZenGen(), 5000);
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
// let ln = new LayeredNoise(230, 68); // 16:9 Fullscreen
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


// simplex2(null);
// scl.unused(perlin, simplex, simplex2);

// console.log(`Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);
