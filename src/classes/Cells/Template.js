// const scl = require("svcorelib");

const Cell = require("../Cell");


class Template extends Cell
{
    constructor()
    {
        super("land");
        this.setColor("white", "black");
    }
}

module.exports = Template;
