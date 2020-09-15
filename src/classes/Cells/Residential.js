// const scl = require("svcorelib");

const PopulatedCell = require("./PopulatedCell");


class Residential extends PopulatedCell
{
    constructor()
    {
        super("residential");
        this.setColor("white", "red");
        this.char = "⌂";
    }

    /**
     * Is called each frame
     */
    update()
    {
        if(new Date().getTime() >= (this.constructionTimestamp + (3 * 60 * 1000)))
        {
            // can upgrade to level 2
            this.levelUp();
            this.char = "R";
        }
    }
}

module.exports = Residential;
