const Perlin = require("pf-perlin");
const scl = require("svcorelib");

const col = scl.colors.fg;


const colors = [
    col.blue  + " ",
    col.blue  + " ",
    col.blue  + "░",
    col.blue  + "▒",
    col.blue  + "▓",
    col.green + "█",
    col.green + "▓",
    col.green + "▒",
    col.green + "░",
    col.red   + "░",
];

const resolution = 150;
const seed = scl.seededRNG.generateRandomSeed(16);

const p = new Perlin({
    dimensions: 2,
    seed
});

process.stdout.write("\n");


const lines = [];
for(let y = 0; y < (process.stdout.rows - 5); y++)
{
    const chars = [];
    for(let x = 0; x < (process.stdout.columns); x++)
    {
        const val = Math.floor(p.get([x / resolution, y / resolution]) * 10);

        chars.push(colors[val] + "\x1b[0m");
    }

    lines.push(chars.join(""));
}

process.stdout.write(lines.join("\n") + "\n");

console.log(`Seed: ${seed}`);
