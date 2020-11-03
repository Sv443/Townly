const scl = require("svcorelib");

const NeedyCell = require("../NeedyCell");
const Need = require("../../Need");

const Commerce = require("../../Needs/Commerce");
const Electricity = require("../../Needs/Electricity");
const Healthcare = require("../../Needs/Healthcare");
const Social = require("../../Needs/Social");
const Water = require("../../Needs/Water");


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
        this.setChar("r");
        this.setInhabitants(10);

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
     * Is called each update tick
     */
    update()
    {
        return new Promise((pRes) => {
            this.tickCounter++;

            if(this.tickCounter % 4 == 0) // every 4 ticks, check if cell can level up
            {
                if(this.level == 1 && this.ageFulfilled(5 * 60) && this.needsFulfilled(Electricity, Water))
                {
                    // cell is on level 1, is older than 5 minutes, has electricity and water
                    // that's why it can upgrade to level 2 now:

                    this.levelUp();
                    this.setChar("R");
                    this.setInhabitants(40);
                }

                if(this.level == 2 && this.ageFulfilled(15 * 60) && this.needsFulfilled(Electricity, Water, Commerce, Healthcare, Social))
                {
                    // cell is on level 2, is older than 15 minutes, has electricity, water, commerce, healthcare and social
                    // cell can upgrade to level 3:

                    this.levelUp();
                    this.setChar("ℝ");
                    this.setInhabitants(150);
                }
            }

            return pRes();
        });
    }
}

module.exports = Residential;
