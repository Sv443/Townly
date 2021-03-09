/********************************************************************/
/* Teng - Creates noise maps from multiple layers of coherent noise */
/********************************************************************/

import { Size } from "../Base";
import { TengObject } from "../TengObject";
import { NoiseLayer } from "./NoiseLayer";


//#MARKER types
/**
 * Function that is used to calculate the noise layer importance
 * @param currentIdx The index of the current layer (0 based)
 * @param lastVal The importance of the last layer - will be `-1` on the first layer
 * @param layerAmount The total amount of layers
 * @returns Should return a floating point number between 0.0 and 1.0
 */
export type LayerImportanceFormula = (currentIdx: number, lastVal: number, layerAmount: number) => number;

/**
 * A 2D array of noise values
 */
export type NoiseMap = number[][];

const defaultLayerImportanceFormula: LayerImportanceFormula = (currentIdx, lastVal, layerAmount) => {
    if(lastVal < 0)
        return 1.0;
    else
        return lastVal / 2;
};

//#MARKER class
/**
 * This class layers multiple instances of the NoiseLayer class on top of each other, producing a coherent noise map
 */
export class LayeredNoise extends TengObject
{
    private importanceFormula: LayerImportanceFormula = defaultLayerImportanceFormula;

    readonly layers: NoiseLayer[];
    readonly size: Size;

    /**
     * Creates an instance of the LayeredNoise class
     * @param layers The different noise layers to apply. Items with a lower index have the largest effect on the generated noise map
     * @param size The size of the noise layers
     */
    constructor(layers: NoiseLayer[], size: Size)
    {
        super("LayeredNoise", `L${layers.length}_${size.width}x${size.height}`);

        this.layers = layers;
        this.size = size;
    }

    /**
     * Adds a noise layer
     */
    addLayer(layer: NoiseLayer): void
    {
        this.layers.push(layer);
    }

    /**
     * Overrides the default importance calculation formula
     */
    setImportanceFormula(func: LayerImportanceFormula): void
    {
        this.importanceFormula = func;
    }

    /**
     * Generates the noise map
     */
    generateMap(): NoiseMap
    {
        let lastImportance = -1.0;

        this.layers.forEach((layer, i) => {
            /** Importance is a modifier to noise layers, which dictates how much a layer contributes to the final noise map */
            const importance = this.importanceFormula(i, lastImportance, this.layers.length);
            lastImportance = importance;

            // TODO:
        });

        return [];
    }
}