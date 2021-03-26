import { gameSettings } from "../settings";

import { seededRNG } from "svcorelib";
import { Algorithm, NoiseLayer, NoiseMap } from "../engine/noise/NoiseLayer";
import { LayeredNoise } from "../engine/noise/LayeredNoise";
import { Size } from "../engine/base/Base";
import { Water } from "./components/cells/Water";
import { Land } from "./components/cells/Land";
import { TownlyCell } from "./components/TownlyCell";


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
     * @param size
     * @param preset
     * @param seed
     */
    static generate(size: Size, preset: MapPreset, seed?: number): Promise<TownlyCell[][]>
    {
        return new Promise<TownlyCell[][]>(async (res, rej) => {
            if(seed == undefined)
                seed = seededRNG.generateRandomSeed(gameSettings.mapGen.seed.digitCount);

            const mapSeed = seed.toString();

            const generatedCells: TownlyCell[][] = [];

            switch(preset)
            {
                case MapPreset.Debug:
                {
                    const ln = new LayeredNoise(size);
                    let noiseMap: NoiseMap = [];

                    switch(preset)
                    {
                        case MapPreset.Debug:
                            ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed: mapSeed, resolution: 50 }));
                            ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed: mapSeed, resolution: 35 }));
                            ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed: mapSeed, resolution: 20 }));

                            noiseMap = await ln.generateMap();
                        break;
                    }

                    // iterate over each noise value and convert it to a TownlyCell
                    size.forEachPosition(pos => {
                        if(pos.y === generatedCells.length)
                            generatedCells.push([]);

                        const noiseVal = noiseMap[pos.y][pos.x];
                        let cell: TownlyCell;

                        if(noiseVal < 5)
                            cell = new Water(pos, true);
                        else if(noiseVal < 6)
                            cell = new Water(pos, false);
                        else
                            cell = new Land(pos);

                        generatedCells[pos.y].push(cell);
                    });

                    break;
                }
            }

            return res(generatedCells);
        });
    }
}
