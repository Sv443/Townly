import { Engine } from "excalibur";


export let game: Engine;

export function initGame()
{
    game = new Engine({
        width: 720,
        height: 480,
    });

    return game;
}
