//#SECTION Smooth LayeredNoise
//#SECTION LayeredNoise Test
const LayeredNoise = require("./src/classes/LayeredNoise");

const scl = require("svcorelib");
const Grid = require("./src/classes/Grid");
const Cell = require("./src/classes/Cell");
const col = scl.colors.fg;

let addT = 0, renderT = 0;

function smoothPerlin(seed, passes)
{
    // let ln = new LayeredNoise(150, 50);
    // let ln = new LayeredNoise(220, 30);
    let ln = new LayeredNoise(233, 69); // 16:9 Fullscreen
    // let ln = new LayeredNoise(426, 100); // 4k
    // let ln = new LayeredNoise(230, 62); // Mac Pro 15"

    addT = new Date().getTime();
    ln.addLayer("perlin", seed, 3.5);

    console.log(ln.seeds[0]);

    renderT = new Date().getTime();

    /** @type {Cell[][]} */
    let cells = [];

    process.stdout.write("\n\n");

    ln.layers[0].forEach((valX, x) => {
        scl.unused(valX);
        cells.push([]);

        valX.forEach((valY, y) => {
            let cell = new Cell("land");

            if(valY < 0.4)
            {
                cell.setType("water");
            }
            else if(valY < 0.5)
            {
                cell.setType("deepwater");
            }
            else if(valY < 0.6)
            {
                cell.setType("land");
            }
            else
            {
                cell.setType("forest");
            }

            cells[x][y] = cell;
        });
    });

    if(passes > 0)
        Grid.smoothGrid(cells, passes);

    cells.forEach(x => {
        process.stdout.write("  ");
        x.forEach(cell => {
            if(cell.type == "water")
            {
                cell.char = "░";
                cell.setColor("blue", "black");
            }
            else if(cell.type == "deepwater")
            {
                cell.char = "▒";
                cell.setColor("blue", "black");
            }
            else if(cell.type == "forest")
            {
                cell.char = "▒";
                cell.setColor("green", "black");
            }
            else
            {
                cell.char = "█";
                cell.setColor("green", "black");
            }

            let color = Cell.colorToEscapeCode(cell.fgcolor);

            process.stdout.write(`${color}${cell.char}${col.rst}`);
        });
        process.stdout.write("\n");
    });
}


function ZenGen()
{
    addT = 0;
    renderT = 0;

    smoothPerlin(null, 5);

    // console.log(`Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);
    scl.unused(addT, renderT);
}

console.clear();

// smoothPerlin(2486795908441090, 250);

setInterval(() => ZenGen(), 5000);
ZenGen();



// //#SECTION Grid Test
// const Grid = require("./src/classes/Grid");

// let g = new Grid(100, 40);

// g.generateMap("Lakes", 1234);



// //#SECTION LayeredNoise Test
// const LayeredNoise = require("./src/classes/LayeredNoise");

// const scl = require("svcorelib");
// const col = scl.colors.fg;

// // let ln = new LayeredNoise(150, 50);
// // let ln = new LayeredNoise(220, 30);
// let ln = new LayeredNoise(230, 68); // 16:9 Fullscreen
// // let ln = new LayeredNoise(426, 100); // 4k
// // let ln = new LayeredNoise(230, 62); // Mac Pro 15"

// let addT = 0, renderT = 0;


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


// perlin(31311);
// scl.unused(perlin, simplex, simplex2);

// console.log(`Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);
