// const scl = require("svcorelib");

const InhabitedCell = require("./InhabitedCell");


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
