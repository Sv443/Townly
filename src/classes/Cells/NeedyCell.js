const scl = require("svcorelib");

const Cell = require("../Cell");
const Need = require("../Need");
const Constructable = require("./Constructable");

scl.unused("typedefs:", Need, Cell);

/**
 * The needy cell handles Needs of cells and their fulfillment
 */
class NeedyCell extends Constructable
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
     * Checks if the specified need is fulfilled
     * @param {Need} need_class Reference to a class derived from the Need base class
     * @returns {Boolean}
     */
    needFulfilled(need_class)
    {
        let result = false;

        if(!(need_class instanceof Need))
            throw new TypeError(`Parameter "need_class" in NeedyCell.needFulfilled() is not an instance of the Need base class`);

        this.needs.forEach(need => {
            if(need instanceof need_class)
            {
                // TODO: check if fulfilled, set `result` accordingly
                result = true;
            }
        });

        return result;
    }

    /**
     * Checks if all of the specified needs are fulfilled
     * @param  {...Need} need_classes References to classes derived from the Need base class
     * @returns {Boolean}
     */
    needsFulfilled(...need_classes)
    {
        let results = [];

        need_classes.forEach((need, i) => {
            if(!(need instanceof Need))
                throw new TypeError(`Spread parameter "need_classes" at index ${i} in NeedyCell.needsFulfilled() is not an instance of the Need base class`);
            
            results.push(this.needFulfilled(need));
        });

        if(scl.allEqual(results))
            return results[0];
        else
            return false;
    }
}

module.exports = NeedyCell;
