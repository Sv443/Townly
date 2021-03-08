import { Position, Size } from "../base/Base";


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
 * A camera is responsible for rendering a specified area of a grid
 */
export class Camera
{
    position: Position;
    viewportSize: Size;

    /**
     * Creates an instance of the Camera class
     * @param initialValues The initial values (position, size, ...) of this camera
     */
    constructor(initialValues: CameraInitialValues)
    {
        this.position = initialValues.position;
        this.viewportSize = initialValues.viewportSize;
    }
}