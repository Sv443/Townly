// const scl = require("svcorelib");

const Cell = require("../Cell");


class Template extends Cell
{
    constructor()
    {
        super("land");
        this.setColors("white", "black");
    }
}

module.exports = Template;
