/**********************************************************/
/* Teng - To be used in LayeredNoise to create noise maps */
/**********************************************************/

import { Size } from "../Base";
import { TengObject } from "../TengObject";


//#MARKER types
/**
 * Describes the coherent noise algorithm to use
 */
export enum NoiseAlgorithm
{
    Perlin,
    Simplex
}

/**
 * Settings for the coherent noise generation
 */
export interface NoiseAlgorithmSettings
{

}

//#MARKER class
/**
 * A single layer of noise to be used in coherent noise layering
 */
export class NoiseLayer extends TengObject
{
    readonly size: Size;
    readonly algorithm: NoiseAlgorithm;
    readonly settings: NoiseAlgorithmSettings;

    /**
     * Creates an instance of the NoiseLayer class
     * @param size The size of this layer
     */
    constructor(size: Size, algorithm: NoiseAlgorithm, algorithmSettings: NoiseAlgorithmSettings)
    {
        super("NoiseLayer", `${size.width}x${size.height}`);

        this.size = size;
        this.algorithm = algorithm;
        this.settings = algorithmSettings;
    }
}