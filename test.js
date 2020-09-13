const LayeredNoise = require("./src/classes/LayeredNoise");

const scl = require("svcorelib");
const col = scl.colors.fg;




// let ln = new LayeredNoise(180, 8);
// let ln = new LayeredNoise(220, 30);
let ln = new LayeredNoise(230, 68); // 16:9 Fullscreen

ln.addLayer("test", null, 3.0); // 5644216182900167

process.stdout.write("\n");
ln.layers[0].forEach(x => {
    process.stdout.write("  ");
    x.forEach(y => {
        if(y < 0.3)
            process.stdout.write(`${col.blue}░${col.rst}`);
        else if(y < 0.5)
            process.stdout.write(`${col.blue}▒${col.rst}`);
        else
            process.stdout.write(` `);
    })
    process.stdout.write("\n");
})

process.exit();


// ln.addLayer("simplex", null, 3.0); // 5644216182900167

// process.stdout.write("\n");
// ln.layers[0].forEach(x => {
//     process.stdout.write("  ");
//     x.forEach(y => {
//         if(y < 0.3)
//             process.stdout.write(`${col.blue}░${col.rst}`);
//         else if(y < 0.4)
//             process.stdout.write(`${col.blue}░${col.rst}`);
//         else if(y < 0.5)
//             process.stdout.write(`${col.blue}▒${col.rst}`);
//         else if(y < 0.6)
//             process.stdout.write(`${col.green}█${col.rst}`);
//         else if(y < 0.7)
//             process.stdout.write(`${col.green}▒${col.rst}`);
//         else
//             process.stdout.write(`${col.green}░${col.rst}`);
//     })
//     process.stdout.write("\n");
// })


// ln.addLayer("simplex", null, 4.5);

// process.stdout.write("\n");
// ln.layers[1].forEach(x => {
//     process.stdout.write("  ");
//     x.forEach(y => {
//         if(y < 0.3)
//             process.stdout.write(`${col.blue}░${col.rst}`);
//         else if(y < 0.4)
//             process.stdout.write(`${col.blue}░${col.rst}`);
//         else if(y < 0.5)
//             process.stdout.write(`${col.blue}▒${col.rst}`);
//         else if(y < 0.6)
//             process.stdout.write(`${col.green}█${col.rst}`);
//         else if(y < 0.7)
//             process.stdout.write(`${col.green}▒${col.rst}`);
//         else
//             process.stdout.write(`${col.green}░${col.rst}`);
//     })
//     process.stdout.write("\n");
// })

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
