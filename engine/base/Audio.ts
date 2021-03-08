import { resolve } from "path";


export type AudioState = "playing" | "paused" | "stopped";

/**
 * Contains an audio file and offers an interface to play it
 */
export class Audio
{
    filePath: string;

    /**
     * Constructs an instance of the Audio class
     * @param filePath Path to the audio file
     */
    constructor(filePath: string)
    {
        this.filePath = resolve(filePath);
    }

    /**
     * Plays the audio
     */
    play(): void
    {

    }

    /**
     * Pauses the audio
     */
    pause(): void
    {

    }

    /**
     * Stops the audio
     */
    stop(): void
    {

    }

    /**
     * Returns the audio's state (playing / paused / stopped)
     */
    getState(): AudioState
    {
        return "playing";
    }

    /**
     * Sets the time of the audio
     * @param time
     */
    setTime(time: number): void
    {

    }

    /**
     * Returns the time of the audio
     */
    getTime(): number
    {
        return 0.0;
    }

    /**
     * Sets the volume of the audio
     * @param vol
     */
    setVolume(vol: number): void
    {

    }

    /**
     * Returns the volume of the audio
     */
    getVolume(): number
    {
        return 1.0;
    }
}