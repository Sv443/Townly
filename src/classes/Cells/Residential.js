// const scl = require("svcorelib");

const InhabitedCell = require("./InhabitedCell");


/**
 * A special area that residents can build houses on and move into  
 *   
 * TODO: Cell has special needs that need to be fulfilled by a SpecialBuilding's influence radius  
 * These are the needs:  
 * - Healthcare (satisfied by: TODO: Hospital)  
 * - Water (satisfied by: TODO: Water Pump)  
 * - Electricity (satisfied by: TODO: Coal Power Plant, TODO: Solar Array)  
 * - Freedom (satisfied by: TODO: Small Park, TODO: Big Park, TODO: Town Hall)
 */
class Residential extends InhabitedCell
{
    constructor()
    {
        super("residential");
        this.setColors("white", "red");
        this.char = "⌂";
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

            return pRes();
        });
    }
}

module.exports = Residential;
