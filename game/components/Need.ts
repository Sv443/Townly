import { gameSettings } from "../../settings";

import TengObject from "../../engine/core/TengObject";


/**
 * Describes what is needed for a need to be fulfilled.  
 *   
 * | Type | Description |
 * | :-- | :-- |
 * | `range` | Need has to be fulfilled within a certain range of the resident |
 * | `existance` | Need is fulfilled just by something existing somewhere on the map |
 */
export type FulfillmentType = "range" | "existance";

/**
 * Every resident has certain needs. This class describes those.
 */
export default abstract class Need extends TengObject
{
    private displayName: string;
    private description: string;
    private fulfillmentType: FulfillmentType;
    private importance: number;


    /**
     * Constructs an instance of the Need class
     * @param displayName Friendly / display name
     * @param fulfillmentType What is needed to fulfill this need
     * @param description Description of this need
     * @param importance Float between 0.0 and 1.0 - Higher importance = citizens will react worse to unfulfillment
     */
    constructor(displayName: string, description: string, fulfillmentType: FulfillmentType = "existance", importance: number = gameSettings.needs.defaultImportance)
    {
        super("Need", `t=${fulfillmentType}/${displayName}`);


        if(importance < 0 || importance > 1)
            throw new TypeError(`Provided importance level of ${importance} is not a float between 0.0 and 1.0`);

        this.displayName = displayName;
        this.description = description;
        this.fulfillmentType = fulfillmentType;
        this.importance = importance;
    }

    toString(): string
    {
        return `Need "${this.getDisplayName()}" of type ${this.getFulfillmentType()} with importance ${this.getImportance()} - UID: ${this.uid.toString()}`;
    }

    //#MARKER other

    /**
     * Returns the display name of this need
     */
    getDisplayName(): string
    {
        return this.displayName;
    }

    /**
     * Returns the description of this need
     */
    getDescription(): string
    {
        return this.description;
    }

    /**
     * Returns the fulfillment type of this need
     */
    getFulfillmentType(): FulfillmentType
    {
        return this.fulfillmentType;
    }

    /**
     * Returns the importance of this need
     */
    getImportance(): number
    {
        return this.importance;
    }
}
