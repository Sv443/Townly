const scl = require("svcorelib");

const NeedyCell = require("./NeedyCell");
const Need = require("../Need");

const Commerce = require("../Needs/Commerce");
const Electricity = require("../Needs/Electricity");
const Healthcare = require("../Needs/Healthcare");
const Social = require("../Needs/Social");
const Water = require("../Needs/Water");


scl.unused("typedefs:", Need);

/**
 * A special area that residents can build houses on and move into  
 *   
 * TODO: Cell has special needs that need to be fulfilled by a SpecialBuilding's influence radius  
 * These are the needs:  
 * - Healthcare (satisfied by: TODO: Hospital)  
 * - Water (satisfied by: TODO: Water Pump)  
 * - Electricity (satisfied by: TODO: Coal Power Plant, TODO: Solar Array)  
 * - Social (satisfied by: TODO: Small Park, TODO: Big Park, TODO: Town Hall)  
 * - Commerce (satisfied by: TODO: Commercial Area)
 */
class Residential extends NeedyCell
{
    constructor()
    {
        super("residential");
        this.setColors("white", "red");
        this.char = "⌂";

        /** @type {Need[]} */
        this.needs = [
            new Commerce(),
            new Electricity(),
            new Healthcare(),
            new Social(),
            new Water()
        ];
    }

    static getName()
    {
        return "Residential Zone";
    }

    static getBaseCost()
    {
        return 100;
    }

    /**
     * Is called each frame
     */
    update()
    {
        return new Promise((pRes) => {
            if(new Date().getTime() >= (this.constructionTimestamp + (3 * 60 * 1000)))
            {
                // can upgrade to level 2
                this.levelUp();
                this.char = "R";
            }

            this.checkNeeds

            return pRes();
        });
    }
}

module.exports = Residential;
