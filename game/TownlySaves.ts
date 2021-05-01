// contains information and functionality regarding Townly's save states and their format

import { JSONCompatible, Size } from "../engine/base/Base";
import SaveState from "../engine/serialization/SaveState";


/**
 * The actual data of a Townly save state.  
 * **When modifying remember:** Only JSON-compatible types are allowed here!
 */
export interface TownlySaveData
{
    [key: string]: JSONCompatible;

    /** The iteration version of this interface's format */
    formatVersion: number;
    /** Info about the town */
    town: {
        /** The name of the town */
        name: string;
    }
    /** Timestamp of when this save state was initially created */
    created: number;
    /** Timestamp of when this save state was last played on */
    lastPlayed: number | null;
    /** Absolute resources like money */
    resources: {
        /** The amount of money the town has */
        money: number;
    }
}

/**
 * An object containing properties that describe and contain a save state
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
