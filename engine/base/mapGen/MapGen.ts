/*****************************************/
/* Teng - Responsible for map generation */
/*****************************************/

import { gameSettings } from "../../../settings";

import { Cell } from "../../components/Cell";
import { seededRNG } from "svcorelib";


/**
 * The preset of a map
 */
export enum MapPreset
{
    Debug
}

/**
 * Generates the game world based on a preset and seed
 */
export abstract class MapGen
{
    /**
     * Generates a map based on a preset and seed
     * @param preset
     * @param seed
     */
    static generate(preset: MapPreset, seed?: number): Cell[][]
    {
        if(seed == undefined)
            seed = seededRNG.generateRandomSeed(gameSettings.mapGen.seed.digitCount);

        if(seed < 10000000 || seed > 99999999)
            throw new TypeError(`Provided seed is not 8 digits in length or starts with a 0`);

        let generatedCells: Cell[][] = [];

        // TODO: generate shit, obviously

        return generatedCells;
    }
}