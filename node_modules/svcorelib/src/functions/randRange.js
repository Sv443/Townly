const { performance } = require("perf_hooks");

function randRange(...args)
{
    let min, max;

    if(typeof args[0] === "number" && typeof args[1] === "number")
    {
        // using (min, max) overload
        [ min, max ] = args;
    }
    else if(typeof args[0] === "number" && typeof args[1] !== "number")
    {
        // using (max) overload
        min = 0;
        max = args[0];
    }
    else
        throw new TypeError(`Wrong parameter provided for "min" and/or "max" in scl.randRange() - (expected: "number" and "number | undefined", got: "${typeof min}" and "${typeof max}")`);

    min = parseInt(min);
    max = parseInt(max);

    if(min > max)
        throw new TypeError(`Invalid parameters provided for "min" and/or "max" in scl.randRange() - make sure "min" is not bigger than "max"`);
    max++;

    let d = Date.now();
    if(typeof performance != "undefined" && typeof performance.now == "function")
        d += performance.now();
    
    let r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}

module.exports = randRange;
