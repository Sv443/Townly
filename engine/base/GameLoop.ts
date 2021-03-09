/********************************/
/* Teng - Handles the game loop */
/********************************/

import { tengSettings } from "../settings";

import { TengObject } from "./TengObject";


declare type GameLoopEvent = "tick";

/**
 * This class handles the game loop, aka the ticks / FPS and maybe other stuff, idk yet
 */
export class GameLoop extends TengObject
{
    targetTps: number;

    onTick = () => {};

    /**
     * Creates an instance of the GameLoop class
     * @param targetTps Sets a target for how many ticks there should be per second
     */
    constructor(targetTps: number = tengSettings.loop.defaultTps)
    {
        super("GameLoop", targetTps.toString());

        this.targetTps = targetTps;
    }

    /**
     * Registers an event
     */
    on(event: GameLoopEvent, callback: () => any): void
    {
        switch(event)
        {
            case "tick":
                this.onTick = callback;
            break;
        }
    }
}