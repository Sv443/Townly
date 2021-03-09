/*************************************************/
/* Teng - Base classes, interfaces and functions */
/*************************************************/


import { colors } from "svcorelib";
import { generalSettings } from "../../settings";


//#MARKER base components
/**
 * Describes a size in 2D space
 */
export interface SizeInterface
{
    width: number;
    height: number;
}

/**
 * Describes a rectangular size in 2D space
 */
export class Size implements SizeInterface
{
    readonly width: number;
    readonly height: number;

    /**
     * Creates a new instance of the class Size
     */
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
    }
}

/**
 * Describes a position / coordinate in 2D space
 */
export interface PositionInterface
{
    x: number;
    y: number;
}

/**
 * Describes a position or coordinate in 2D space
 */
export class Position implements PositionInterface
{
    readonly x: number;
    readonly y: number;

    /**
     * Creates a new instance of the Position class
     */
    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
}

/**
 * Describes an area in 2D space
 */
export interface AreaInterface
{
    corners: AreaCornersInterface;
}

/**
 * Contains the corners of an area
 */
declare interface AreaCornersInterface
{
    /** Top left corner */
    tl: Position;
    /** Bottom right corner */
    br: Position;
}

/**
 * Describes a rectangular 2D area in a 2D space
 */
export class Area implements AreaInterface
{
    readonly corners: AreaCornersInterface;

    /**
     * Creates a new instance of the Area class
     */
    constructor(cornerTL: Position, cornerBR: Position)
    {
        this.corners = {
            tl: cornerTL,
            br: cornerBR
        };
    }
}

//#SECTION colors

/**
 * Describes a foreground or background color that can be rendered to a terminal / command line
 */
export enum Color
{
    /** Resets both foreground *and* background color */
    Reset,

    Black,
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White
};

/**
 * Describes the type of color
 */
export enum ColorType
{
    /** Text color */
    Foreground,
    /** Background color */
    Background
}

/**
 * Resolves a color type and name to a string representation that can be used to color the terminal / command line
 * @param type The type of the color to resolve
 * @param col The color to resolve
 * @param dim Set to true to dim the color
 */
export function resolveColor(type: ColorType, col: Color, dim: boolean = false): string
{
    let retColor = "";

    let colorMapping: {[key: string]: string};

    switch(type)
    {
        case ColorType.Foreground:
            colorMapping = {
                Reset:   "\x1b[0m",
                Black:   "\x1b[30m",
                Red:     "\x1b[31m",
                Green:   "\x1b[32m",
                Yellow:  "\x1b[33m",
                Blue:    "\x1b[34m",
                Magenta: "\x1b[35m",
                Cyan:    "\x1b[36m",
                White:   "\x1b[37m",
            };
        break;
        case ColorType.Background:
            colorMapping = {
                Reset:   "\x1b[0m",
                Black:   "\x1b[40m",
                Red:     "\x1b[41m",
                Green:   "\x1b[42m",
                Yellow:  "\x1b[43m",
                Blue:    "\x1b[44m",
                Magenta: "\x1b[45m",
                Cyan:    "\x1b[46m",
                White:   "\x1b[47m",
            };
        break;
    }

    const chosenColor = colorMapping[Color[col]];

    retColor = (dim ? "\x1b[2m" : "\x1b[1m") + chosenColor;

    return retColor;
}


//#MARKER logging

/** Describes the log level */
export type LogLevel = "success" | "info" | "warning" | "error" | "fatal";

/**
 * Logs a debug message to the console
 * @param section
 * @param message
 * @param color
 */
export function dbg(section: string, message: string, level: LogLevel = "info")
{
    if(generalSettings.debug.verboseLogging)
    {
        let consoleCol = "";
        let logType = "";

        switch(level)
        {
            case "success":
                consoleCol = colors.fg.green;
                logType = "Debug";
            break;
            case "info":
                consoleCol = colors.fg.cyan;
                logType = "Debug";
            break;
            case "warning":
                consoleCol = colors.fg.yellow;
                logType = "Warning";
            break;
            case "error":
                consoleCol = colors.fg.red;
                logType = "Error";
            break;
            case "fatal":
                consoleCol = colors.fg.magenta;
                logType = "FATAL";
            break;
        }

        console.log(`${consoleCol}[${logType}/${colors.fg.blue}${section}${consoleCol}]: ${colors.rst}${message}${colors.rst}`);
    }
}