import { Size } from "../engine/base/Base";
import { SaveState } from "../engine/serialization/SaveState";


/**
 * Data of a save state
 */
export interface TownlySaveData
{
    /** The version of this interface's format */
    formatVersion: number;
    /** Info about the town */
    townInfo: {
        /** The name of the town */
        name: string;
    }
    /** The datetime of when this save state was initially created */
    created: Date;
    /** The datetime of when this save state was last played on */
    lastSaved: Date | null;
    /** Absolute resources like money */
    resources: {
        /** The amount of money */
        money: number;
    }
}

/**
 * An object containing useful properties that describe a save state
 */
export interface SaveStateInfo
{
    [key: string]: string | SaveState<TownlySaveData> | Date | Size;

    /** The name of the save state */
    name: string;
    /** The save state instance */
    instance: SaveState<TownlySaveData>;
    /** The datetime of when this save state was initially created */
    created: Date;
    /** The datetime of when this save state was last played on */
    lastSaved: Date;
    /** The size of the grid */
    gridSize: Size;
}
