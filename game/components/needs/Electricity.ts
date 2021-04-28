import Need from "../Need";


/**
 * This need is fulfilled by having adequate electrical generation facilities in the city
 */
export default class Electricity extends Need
{
    /**
     * Creates an instance of the Electricity need class
     */
    constructor()
    {
        super("Electricity", "Citizens need electricity to live a modern life.", "existance", 0.8);
    }
}
