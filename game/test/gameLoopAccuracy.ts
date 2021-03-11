import { colors } from "svcorelib";
import { GameLoop } from "../../engine/base/GameLoop";


/** Target ticks per second */
const tps = 5;

const gl = new GameLoop(tps);


let lastTS = 0;
const diffs: number[] = [];

gl.on("tick", (tickNum) => {
    const currentTS = Date.now();
    const sinceCreation = (currentTS - gl.getCreationTime().getTime()) / 1000;
    const diff = currentTS - lastTS;

    console.log(`Tick #${tickNum} - time since creation: ${sinceCreation.toFixed(1)}s - timestamp: ${currentTS} - diff to last: ${diff}`);

    lastTS = currentTS;

    if(tickNum > 0)
        diffs.push(diff);

    if(tickNum > 0 && tickNum % 100 == 0)
    {
        const tot = diffs.reduce((acc, cur) => acc + cur) / diffs.length;
        console.log(`${colors.fg.yellow}Accuracy (1 is optimal): ${tot / (1000 / tps)}${colors.rst}`);
    }
});

console.log(`Created GameLoop instance: ${gl.toString()}`);
