import { gameSettings } from "../../settings";

import { Cell } from "../components/Cell";
import { seededRNG } from "svcorelib";


export type WorldGenPreset = "dbg";

export class WorldGen
{
    static generateMap(preset: WorldGenPreset, seed?: number): Cell[][]
    {
        if(seed == undefined)
            seed = seededRNG.generateRandomSeed(gameSettings.worldGen.seed.digitCount);

        let generatedCells: Cell[][] = [];

        return generatedCells;
    }
}