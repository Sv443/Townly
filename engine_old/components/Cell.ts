/*************************************************************/
/* Teng - Cells are the smallest parts that make up the game */
/*************************************************************/

import { Position, Color, ColorType } from "../base/Base";
import { TengObject } from "../base/TengObject";


/**
 * Describes a single cell.  
 * Cells have to be contained in a Grid or Chunk.
 */
export abstract class Cell extends TengObject
{
    private position: Position;
    private char: string;

    /** The colors of this cell */
    private colors = {
        /** Foreground / text color */
        fg: Color.White,
        /** Whether the foreground color is dim */
        fgDim: false,
        /** Background color */
        bg: Color.Black,
        /** Whether the background color is dim */
        bgDim: false
    };

    private cursorActive: boolean = false;


    /**
     * Constructs a new instance of the Cell class
     * @param position The position of the cell inside its parent container
     * @param char This cell's representation as a single character
     */
    constructor(position: Position, char: string)
    {
        super("Cell", `${position.x},${position.y}`);

        if(char.length !== 1)
            throw new TypeError(`Passed char "${char}" has to be exactly 1 character in length`);

        this.position = position;
        this.char = char;
    }

    //#MARKER methods / setters
    /**
     * Abstract method - called on each tick to update this cell
     */
    abstract update(): Promise<void>;

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
     * @param dim Whether this color should be set to a darker shade
     */
    setColor(type: ColorType, color: Color, dim: boolean = false): void
    {
        switch(type)
        {
            case ColorType.Foreground:
                this.colors.fg = color;
                this.colors.fgDim = dim;
            break;
            case ColorType.Background:
                this.colors.bg = color;
                this.colors.bgDim = dim;
            break;
        }
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

    //#MARKER static

    /**
     * Checks if the passed value is a Cell
     */
    static isCell(value: any): value is Cell
    {
        value = (value as Cell);

        if(typeof value.getPosition !== "function" || !(value.getPosition() instanceof Position))
            return false;

        if(typeof value.getChar !== "function" || typeof value.getChar() !== "string" || value.getChar().length !== 1)
            return false;

        return true;
    }
}