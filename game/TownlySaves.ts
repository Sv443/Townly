// contains information and functionality regarding Townly's save states and their format

import prompt from "prompts";

import TengObject from "../engine/core/TengObject";
import { JSONCompatible, Size } from "../engine/core/BaseTypes";
import SaveState from "../engine/serialization/SaveState";



//TODO: make sure save states can't be overridden

/**
 * The actual data of a Townly save state.  
 * **When modifying remember:** Only JSON-compatible types are allowed here!
 */
export interface ITownlySaveData
{
    //#DEBUG
    [key: string]: JSONCompatible;

    foo: string;
    bar: number;
}
// export interface ITownlySaveData
// {
//     /*  !!!  don't modify this index signature  !!!  */
//     [key: string]: JSONCompatible;

//     /** The iteration version of this interface's format */
//     formatVersion: number;
//     /** Info about the town */
//     town: {
//         /** The name of the town */
//         name: string;
//     }
//     /** Timestamp of when this save state was initially created */
//     created: number;
//     /** Timestamp of when this save state was last played on */
//     lastPlayed: number | null;
//     /** Absolute resources like money */
//     resources: {
//         /** The amount of money the town has */
//         money: number;
//     }
// }

/**
 * An object containing properties that describe and contain a save state
 */
export interface ISaveStateInfo
{
    [key: string]: string | SaveState<ITownlySaveData> | Date | Size;

    /** The name of the save state */
    name: string;
    /** The save state instance */
    instance: SaveState<ITownlySaveData>;
    /** The datetime of when this save state was initially created */
    created: Date;
    /** The datetime of when this save state was last played on */
    lastSaved: Date;
    /** The size of the grid */
    gridSize: Size;
}


// TODO: integrate LocalStorage class

export class SavesManager extends TengObject
{
    protected saveStates: SaveState<ITownlySaveData>[] = [];

    protected savesDirectory: string;
    private saveEncrypted = true;


    constructor(savesDirectory: string)
    {
        super("SavesManager");

        this.savesDirectory = savesDirectory;
    }

    toString(): string
    {
        return `SavesManager (${this.saveStates.length} saves)`;
    }

    //#MARKER private
    
    /**
     * Loads all local save states and resolves with the amount of them that could be loaded
     */
    loadLocalStates(): Promise<number>
    {
        return new Promise(async res => {
            // 1. read directory

            // 2. iterate over files

            // 3. read each file

            // 4. create instances according to file content
            this.saveStates.push(SaveState.fromFile<ITownlySaveData>("TODO:"));

            // 5. exit iteration
            return res(this.saveStates.length);
        });
    }

    //#MARKER other

    /**
     * Runs a few prompts and creates a save game with the results
     */
    createSaveState(): Promise<ISaveStateInfo>
    {
        return new Promise(async (res) => {
            const saveStateInfo: Partial<ISaveStateInfo> = {};

            // TODO: ditch "prompts" package

            //#SECTION Name of Town
            const namePrompt = await prompt({
                type: "text",
                name: "name",
                message: "What should your town be called? (for some reasons characters are captured twice, idk why)"
            });

            saveStateInfo.name = namePrompt.name;


            //#SECTION Size of Town
            const sizePrompt = await prompt({
                type: "select",
                name: "size",
                choices: [
                    {
                        title: "100 x 50",
                        value: new Size(100, 50)
                    },
                    {
                        title: "250 x 100",
                        value: new Size(250, 100)
                    },
                    {
                        title: "500 x 250",
                        value: new Size(500, 250)
                    }
                ],
                message: "How big should your town's area be?  [width x height]"
            });

            saveStateInfo.gridSize = (sizePrompt.size as Size);

            saveStateInfo.instance = new SaveState<ITownlySaveData>(this.savesDirectory, (saveStateInfo.name as string), this.saveEncrypted);


            const creationDate = new Date();

            saveStateInfo.created = creationDate;
            saveStateInfo.lastSaved = creationDate;


            this.saveStates.push(saveStateInfo.instance);

            //#DEBUG
            await saveStateInfo.instance.setData({
                foo: "test",
                bar: 123
            });

            await saveStateInfo.instance.save();

            console.log(`\n\nDEBUG: saving some example data to '${saveStateInfo.instance.getAbsFilePath()}'`);

            //#DEBUG


            return res(saveStateInfo as ISaveStateInfo);
        });
    }
}