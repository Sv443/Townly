const scl = require("svcorelib");

const Cell = require("../Cell");
const Need = require("../Need");
const InhabitedCell = require("./InhabitedCell");

scl.unused("typedefs:", Need, Cell);

/**
 * The needy cell handles Needs of cells and their fulfillment
 */
class NeedyCell extends InhabitedCell
{
    /**
     * Constructs a new object of class NeedyCell
     * @param {Cell.CellType} type 
     */
    constructor(type)
    {
        super(type);

        /** @type {Need[]} */
        this.needs = [];
    }

    /**
     * To be called on each update tick  
     * Make sure to call checkNeeds() in here!
     */
    update()
    {
        return new Promise((pRes) => {
            return pRes();
        });
    }

    /**
     * Checks all needs and updates them
     * @param {Boolean} [updateInfluenceAreas=false] Whether or not to update influence areas too
     */
    checkNeeds(updateInfluenceAreas)
    {
        if(updateInfluenceAreas !== true)
            updateInfluenceAreas = false;

        this.needs.forEach(need => {
            let needProps = {
                name: need.name,
                description: need.description,
                importance: need.importance
            };

            if(updateInfluenceAreas)
            {
                scl.unused("TODO: re-fetch influence areas");
            }
            
            // TODO: check if needs are fulfilled
            scl.unused(needProps);
        });
    }
}

module.exports = NeedyCell;
