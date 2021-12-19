import { Engine } from "excalibur";


export let game: Engine;

let initialized = false;


export function init()
{
    if(initialized)
        return;

    console.log("Initializing game");

    game = new Engine({
        width: 720,
        height: 480,
    });

    initialized = true;
}
