import { colors } from "svcorelib";
import { generalSettings } from "../../settings";

/**
 * Describes a size in 2D space
 */
export interface Size
{
    width: number;
    height: number;
}

/**
 * Describes a position / coordinate in 2D space
 */
export interface Position
{
    x: number;
    y: number;
}

/**
 * Describes an area in 2D space
 */
export interface Area
{
    /** Top left corner */
    cornerTL: Position;
    /** Bottom right corner */
    cornerBR: Position;
}

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