import { PostProcessor } from './PostProcessor';
import { Engine } from '../Engine';
export declare enum ColorBlindness {
    Protanope = 0,
    Deuteranope = 1,
    Tritanope = 2
}
/**
 * This post processor can correct colors and simulate color blindness.
 * It is possible to use this on every game, but the game's performance
 * will suffer measurably. It's better to use it as a helpful tool while developing your game.
 * Remember, the best practice is to design with color blindness in mind.
 */
export declare class ColorBlindCorrector implements PostProcessor {
    engine: Engine;
    simulate: boolean;
    colorMode: ColorBlindness;
    private _vertexShader;
    private _fragmentShader;
    private _internalCanvas;
    private _gl;
    private _program;
    constructor(engine: Engine, simulate?: boolean, colorMode?: ColorBlindness);
    private _getFragmentShaderByMode;
    private _setRectangle;
    private _getShader;
    process(image: ImageData, out: CanvasRenderingContext2D): void;
}
