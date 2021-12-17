import { gameSettings } from "../../settings";

import { seededRNG } from "svcorelib";
import NoiseLayer, { NoiseMap } from "../../engine/noise/NoiseLayer";
import LayeredNoise from "../../engine/noise/LayeredNoise";
import { Size } from "../../engine/core/BaseTypes";
import Water from "../components/cells/Water";
import Land from "../components/cells/Land";
import TownlyCell from "../components/TownlyCell";


//#MARKER types

/**
 * The preset of a map
 * | Preset | Description |
 * | :-- | :-- |
 * | `Lakes` | Generates land and water through perlin noise |
 * | `Lowlands` | Generates land and all resources but no water |
 * | `Steppe` | The entire map will be filled with only land and will not have any trees but will have underground resources |
 * | `Prairie` | The entire map will be filled with land cells and won't have any underground resources |
 */
export type MapPreset = "Lakes" | "Lowlands" | "Steppe" | "Prairie";

const mapPresetNameMapping = new Map<MapPreset, string>([
    ["Lakes", "Lakes"],
    ["Lowlands", "Lowlands"],
    ["Steppe", "Steppe"],
    ["Prairie", "Prairie"],
]);


//#MARKER class

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
            if(!seed)
                seed = seededRNG.generateRandomSeed(gameSettings.mapGen.seed.digitCount);

            const generatedCells: TownlyCell[][] = [];

            const presetName = this.getPresetName(preset);

            switch(preset)
            {
                case "Lakes":
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
                case "Lakes":
                {
                    ln.addLayer(new NoiseLayer(size, "Perlin", { seed, resolution: 90 }));
                    ln.addLayer(new NoiseLayer(size, "Perlin", { seed, resolution: 60 }));
                    ln.addLayer(new NoiseLayer(size, "Perlin", { seed, resolution: 20 }));

                    let lnMap = await ln.generateMap();

                    lnMap = await LayeredNoise.smoothMap(lnMap, "CA_ExtraSmooth", 1);
                    lnMap = await LayeredNoise.smoothMap(lnMap, "CA_Smooth", 1);

                    return res(LayeredNoise.smoothMap(lnMap, "CA_Coarse", 2));
                }
            }
        });
    }

    /**
     * Returns the friendly name of the passed preset
     */
    static getPresetName(preset: MapPreset): string
    {
        return mapPresetNameMapping.get(preset) as string;
    }
}
