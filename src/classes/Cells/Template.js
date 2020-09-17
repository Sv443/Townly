// const scl = require("svcorelib");

const Cell = require("../Cell");


class Template extends Cell
{
    constructor()
    {
        super("TYPE");
        this.setColors("white", "black");
        this.setChar("?");
    }

    bulldoze()
    {
        return true;
    }
}

module.exports = Template;
