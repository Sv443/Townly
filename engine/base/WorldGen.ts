import { gameSettings } from "../../settings";

import { Cell } from "../components/Cell";
import { seededRNG } from "svcorelib";


export type WorldGenPreset = "dbg";

/**
 * Generates the game world based on a preset and seed
 */
export class WorldGen
{
    /**
     * Generates a map based on a preset and seed
     * @param preset
     * @param seed
     */
    static generateMap(preset: WorldGenPreset, seed?: number): Cell[][]
    {
        if(seed == undefined)
            seed = seededRNG.generateRandomSeed(gameSettings.worldGen.seed.digitCount);
        
        if(seed < 10000000 || seed > 99999999)
            throw new TypeError(`Provided seed is not 8 digits in length or starts with a 0`);

        let generatedCells: Cell[][] = [];

        // TODO: generate shit, obviously

        return generatedCells;
    }
}