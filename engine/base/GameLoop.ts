import { tengSettings } from "../settings";

import { TengObject } from "./TengObject";




/**
 * This class handles the game loop, aka the ticks / FPS and maybe other stuff, idk yet
 */
export class GameLoop extends TengObject
{
    targetTps: number;

    /**
     * Creates an instance of the GameLoop class
     * @param targetTps Sets a target for how many ticks there should be per second
     */
    constructor(targetTps: number = tengSettings.loop.defaultTps)
    {
        super("GameLoop", targetTps.toString());

        this.targetTps = targetTps;
    }
}