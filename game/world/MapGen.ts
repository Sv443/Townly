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
    /** Generates land and water through perlin noise */
    Lakes,
    /** Generates land and all resources but no water */
    Lowlands,
    /** The entire map will be filled with only land and will not have any trees but will have underground resources */
    Steppe,
    /** The entire map will be filled with land cells and won't have any underground resources */
    Prairie,
}

const mapPresetNameMapping = new Map<MapPreset, string>([
    [MapPreset.Lakes, "Lakes"],
    [MapPreset.Lowlands, "Lowlands"],
    [MapPreset.Steppe, "Steppe"],
    [MapPreset.Prairie, "Prairie"],
]);


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
                case MapPreset.Lakes:
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
                case MapPreset.Lakes:
                {
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 90 }));
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 60 }));
                    ln.addLayer(new NoiseLayer(size, Algorithm.Perlin, { seed, resolution: 20 }));

                    let lnMap = await ln.generateMap();

                    lnMap = await LayeredNoise.smoothMap(lnMap, SmoothingAlgorithm.CA_ExtraSmooth, 1);
                    lnMap = await LayeredNoise.smoothMap(lnMap, SmoothingAlgorithm.CA_Smooth, 1);

                    return res(LayeredNoise.smoothMap(lnMap, SmoothingAlgorithm.CA_Coarse, 2));
                }
            }
        });
    }

    /**
     * Returns the friendly name of the passed preset
     */
    static getPresetName(preset: MapPreset): string
    {
        return (mapPresetNameMapping.get(preset) as string);
    }
}
