// TODO:

const defaultImportance = 0.5;

/**
 * Contains information about a resident's Need  
 * To be inherited by subclasses in "./src/classes/Needs"
 */
class Need
{
    /**
     * Constructs a new object of the base class Need
     * @param {String} friendlyName Name of the need
     * @param {String} description Description of the need
     * @param {Number} importance Floating-point number between 0.0 and 1.0
     */
    constructor(friendlyName, description, importance)
    {
        this.name = friendlyName || "ERROR_NO_NAME_GIVEN";
        this.description = description || "ERROR_NO_DESCRIPTION_GIVEN";

        this.importance = (typeof importance != "number" || (importance % 1 == 0)) ? defaultImportance : importance;
    }

    /**
     * Returns the importance of this Need  
     * Higher importance = Citizens will react worse to unfulfillment if this is set high
     * @returns {Number} Floating-point number between 0.0 and 1.0
     */
    getImportance()
    {
        return this.importance;
    }

    /**
     * Returns the name of this Need  
     * Will be shown in the detailed view
     * @returns {String} Friendly Name of this Need
     */
    getName()
    {
        return this.name;
    }

    /**
     * Returns the description of this Need  
     * Will be shown in the detailed view
     * @returns {String} Description of this Need
     */
    getDescription()
    {
        return this.description;
    }
}

module.exports = Need;
