import { Need } from "../Need";


/**
 * This need is fulfilled by having adequate electrical generation facilities in the city
 */
export class Electricity extends Need
{
    /**
     * Creates an instance of the Electricity need class
     */
    constructor()
    {
        super("Electricity", "Citizens need electricity to live a modern life.", 0.8);
    }
}
