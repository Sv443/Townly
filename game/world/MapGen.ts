import { gameSettings } from "../../settings";

import { seededRNG } from "svcorelib";
import { Algorithm, NoiseLayer, NoiseMap } from "../../engine/noise/NoiseLayer";
import { LayeredNoise, SmoothingAlgorithm } from "../../engine/noise/LayeredNoise";
import { Size } from "../../engine/base/Base";
import { Water } from "../components/cells/Water";
import { Land } from "../components/cells/Land";
import { TownlyCell } from "../components/TownlyCell";


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
     */
    static generate(size: Size, preset: MapPreset, seed?: number): Promise<TownlyCell[][]>
    {
        // this method creates a 2D TownlyCell array

        return new Promise<TownlyCell[][]>(async (res, rej) => {
            if(seed == undefined)
                seed = seededRNG.generateRandomSeed(gameSettings.mapGen.seed.digitCount);

            const generatedCells: TownlyCell[][] = [];

            switch(preset)
            {
                case MapPreset.Debug:
                {
                    const noiseMap = await MapGen.createNoiseMap(size, preset, seed);

                    // iterate over each noise value and convert it to a TownlyCell
                    size.forEachPosition(pos => {
                        if(pos.y === generatedCells.length)
                            generatedCells.push([]);

                        const noiseVal = noiseMap[pos.y][pos.x] * 10;
                        let cell: TownlyCell;

                        if(noiseVal < 3.5)
                            cell = new Water(pos, true);
                        else if(noiseVal < 4.5)
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

    /**
     * Creates a noise map
     */
    private static createNoiseMap(size: Size, preset: MapPreset, seed: number): Promise<NoiseMap>
    {
        // this method only creates a smoothed 2D noise map

        return new Promise<NoiseMap>(async (res) => {
            const ln = new LayeredNoise(size);

            switch(preset)
            {
                case MapPreset.Debug:
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 90 }));
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 60 }));
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 20 }));

                    const lnMap = await ln.generateMap();

                    const first = await LayeredNoise.smoothMap(lnMap, SmoothingAlgorithm.CA_ExtraSmooth, 2);
                    const second = await LayeredNoise.smoothMap(first, SmoothingAlgorithm.CA_Smooth, 2);

                    return res(LayeredNoise.smoothMap(second, SmoothingAlgorithm.CA_Coarse, 3));
                    // return res(lnMap);
            }
        });
    }
}
