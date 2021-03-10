/*********************************************/
/* Teng - Responsible for rendering the game */
/*********************************************/

import { TengObject } from "../base/TengObject";
import { Position, Size } from "../base/Base";
import { Cell } from "../components/Cell";
import { Grid } from "../components/Grid";


/**
 * Describes the initial values of a camera
 */
export interface CameraInitialValues
{
    /** Position of the top left corner of the camera */
    position: Position;
    /** Size of the camera's viewport */
    viewportSize: Size;
}

/**
 * Describes a renderable representation of a grid
 */
export type RenderableGrid = string[][];

/**
 * A camera is responsible for rendering a specified area of a grid
 */
export class Camera extends TengObject
{
    /** The position of the camera's top left corner, in a parent grid */
    readonly position: Position;
    /** The size of the camera's viewport / frustum / whatever tf it's called */
    readonly viewportSize: Size;

    /** The stream to write the rendered data to */
    private outStream: NodeJS.WriteStream;

    /** Buffers a frame until it is rendered, then it's overwritten with a newly calculated frame */
    private renderBuffer: Cell[][] = [];
    /** Is set to true only while a new frame is currently being rendered */
    readonly isRenderingFrame: boolean = false;


    /**
     * Creates an instance of the Camera class
     * @param initialValues The initial values (position, size, ...) of this camera
     * @param outStream The stream to write the rendered stuff to - defaults to `process.stdout`
     */
    constructor(initialValues: CameraInitialValues, outStream: NodeJS.WriteStream = process.stdout)
    {
        super("Camera", `${initialValues.viewportSize.width}x${initialValues.viewportSize.height}`);

        this.position = initialValues.position;
        this.viewportSize = initialValues.viewportSize;

        this.outStream = outStream;
    }

    /**
     * Draws the previously calculated frame and simultaneously starts calculating the next frame
     * @param grid The grid to render to the screen
     */
    draw(grid: Grid): Promise<void>
    {
        return new Promise<void>((res, rej) => {
            const tryDraw = async () => {
                if(this.renderBuffer.length === 0)
                {
                    if(!this.isRenderingFrame)
                    {
                        // this is the first call to draw() since instantiation of the camera, so the frame has to be rendered
                        let renderGrid = await this.renderFrame(grid);
                    }
                    else
                    {
                        // a frame is currently being rendered
                    }
                }
                else
                {
                    // previous frame has been rendered, so it just has to be drawn
                }
            };

            tryDraw();
        });
    }

    /**
     * Renders a frame of a passed grid
     * @param grid
     */
    renderFrame(grid: Grid): Promise<RenderableGrid>
    {
        return new Promise<RenderableGrid>(async (res, rej) => {
            const renderedCells: string[][] = [];

            return renderedCells;
        });
    }

    //#MARKER static

    /**
     * Checks if the passed value is a Camera
     */
    static isCamera(value: any): value is Camera
    {
        value = (value as Camera);

        if(!(value.position instanceof Position))
            return false;

        if(!(value.viewportSize instanceof Size))
            return false;

        if(typeof value.isRenderingFrame !== "boolean")
            return false;

        return true;
    }
}