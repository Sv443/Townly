import { Position, Color, ColorType } from "../base/Base";


/**
 * Describes a single cell.  
 * Cells have to be contained in a Grid or Chunk.
 */
export abstract class Cell
{
    private position: Position;
    private char: string;

    private colors = {
        fg: Color,
        bg: Color
    };

    private cursorActive: boolean = false;


    /**
     * Constructs a new instance of the Cell class
     * @param position The position of the cell inside its parent container
     * @param char This cell's representation as a single character
     */
    constructor(position: Position, char: string)
    {
        if(char.length !== 1)
            throw new TypeError(`Passed char "${char}" has to be exactly 1 character in length`);

        this.position = position;
        this.char = char;
    }

    //#MARKER methods / setters
    /**
     * Sets the state of the cursor
     * @param active
     */
    setCursorActive(active: boolean): void
    {
        this.cursorActive = active;
    }

    /**
     * Sets this cell's color
     * @param type The type of the color (foreground, background, ...)
     * @param color The actual color to set
     */
    setColor(type: ColorType, color: Color): void
    {

    }

    //#MARKER getters
    /**
     * Returns the position of this cell in its parent grid
     */
    getPosition(): Position
    {
        return this.position;
    }

    /**
     * Returns the current state of the cursor
     */
    getCursorActive(): boolean
    {
        return this.cursorActive;
    }

    /**
     * Returns this cell's representation as a character
     */
    getChar(): string
    {
        return this.char;
    }
}