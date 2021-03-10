/**************************************************/
/* Teng - A way to play audio on the command line */
/**************************************************/

import { resolve } from "path";
import { statSync } from "fs-extra";

import { TengObject } from "./TengObject";


/**
 * Describes the state of an audio
 */
export enum AudioState
{
    Playing,
    Paused,
    Stopped
};

/**
 * Contains an audio file and offers an interface to play it
 */
export class Audio extends TengObject
{
    private filePath: string;

    private currentTime = 0.0;
    private volume = 1.0;

    private state = AudioState.Stopped;


    /**
     * Constructs an instance of the Audio class
     * @param filePath Path to the audio file
     */
    constructor(filePath: string)
    {
        super("Audio");

        filePath = resolve(filePath);

        if(!statSync(filePath).isFile())
            throw new TypeError(`File path "${filePath}" is invalid or doesn't point to a file`);

        this.filePath = filePath;
    }

    /**
     * Plays the audio
     */
    play(): void
    {
        const state = this.getState();

        if(state === AudioState.Paused || state === AudioState.Stopped)
        {
            // TODO:
        }
    }

    /**
     * Pauses the audio
     */
    pause(): void
    {
        const state = this.getState();

        if(state === AudioState.Playing)
        {
            // TODO:
        }
    }

    /**
     * Stops the audio
     */
    stop(): void
    {
        const state = this.getState();

        if(state === AudioState.Playing || state === AudioState.Paused)
        {
            // TODO:
        }
    }

    /**
     * Returns the audio's state (playing / paused / stopped)
     */
    getState(): AudioState
    {
        return this.state;
    }

    /**
     * Sets the time of the audio
     * @param time
     */
    setTime(time: number): void
    {
        if(time < 0)
            throw new TypeError(`Provided time ${time} is out of range (expected 0.0 or more)`);

        this.currentTime = time;
    }

    /**
     * Returns the time of the audio
     */
    getTime(): number
    {
        return this.currentTime;
    }

    /**
     * Sets the volume of the audio
     * @param vol
     */
    setVolume(vol: number): void
    {
        if(vol < 0 || vol > 1)
            throw new TypeError(`Volume ${vol} is out of range (expected value between 0.0 and 1.0)`);

        this.volume = vol;
    }

    /**
     * Returns the volume of the audio
     */
    getVolume(): number
    {
        return this.volume;
    }

    //#MARKER static

    /**
     * Checks if the passed value is an Audio
     */
    static isCamera(value: any): value is Audio
    {
        value = (value as Audio);

        if(typeof value.play !== "function")
            return false;

        if(typeof value.pause !== "function")
            return false;

        if(typeof value.stop !== "function")
            return false;

        return true;
    }
}