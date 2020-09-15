const Grid = require("./src/classes/Grid");

let g = new Grid(100, 40);


g.generateMap("Lakes", 1234);



// const LayeredNoise = require("./src/classes/LayeredNoise");

// const scl = require("svcorelib");
// const col = scl.colors.fg;




// let ln = new LayeredNoise(150, 50);
// // let ln = new LayeredNoise(220, 30);
// // let ln = new LayeredNoise(230, 68); // 16:9 Fullscreen
// // let ln = new LayeredNoise(426, 100); // 4k
// // let ln = new LayeredNoise(230, 62); // Mac Pro 15"

// let addT = 0, renderT = 0;


// function perlin()
// {
//     addT = new Date().getTime();
//     ln.addLayer("perlin", null, 4.5);

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

// function simplex()
// {
//     addT = new Date().getTime();
//     ln.addLayer("simplex", null, 3.0);

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


// function simplex2()
// {
//     addT = new Date().getTime();
//     ln.addLayer("simplex2", null, 5.5);

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


// simplex();

// console.log(`Generated in ${renderT - addT}ms - Rendered in ${new Date().getTime() - renderT}ms`);







// console.log("\n" + ln.seeds[0]);

// ln.addLayer("perlin", 3, 5, 132, 1.0);
// ln.addLayer("perlin", 3, 5, 132, 1.0);



// const Perlin = require("pf-perlin");

// let noise = new Perlin({
//     dimensions: 2,
//     seed: 9155659731972362
// });

// let height = 5;
// let width = 10;

// let resolutionA = 50;
// let resolutionB = 30;
// let resolutionC = 20;
// let resolutionD = 10;

// let threshold = 0.4;

// let layerAmount = 4;

// let currentContribMultiplier = 1.0;


// let layers = [];

// for(let i = 0; i < layerAmount; i++)
//     layers.push([]);

// console.log("\n");

// for(let l = 0; l < layerAmount; l++)
// {
//     for(let x = 0; x < height; x++)
//     {
//         layers[l].push([]);
//         for(let y = 0; y < width; y++)
//         {
//             let noiseVal = noise.get([x / resolutionA, y / resolutionA]);
//             let val = parseFloat((Math.abs(noiseVal) * currentContribMultiplier).toFixed(3));
//             layers[l][x].push(val);
//         }
//     }

//     currentContribMultiplier = currentContribMultiplier / 2;
// }

// /*

// layer1

// */

// console.log(layers);

// console.log("\n");
