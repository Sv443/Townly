/**
 * This class contains a position in two-dimensional space
 */
class Position
{
    /**
     * Creates a new object of class Position
     * @param {Number} [x] 
     * @param {Number} [y] 
     */
    constructor(x, y)
    {
        x = parseInt(x);
        y = parseInt(y);

        if((typeof x != "undefined" && typeof y != "undefined") && (isNaN(x) || isNaN(y) || !Number.isSafeInteger(x) || !Number.isSafeInteger(y)))
            throw new TypeError(`Error while constructing an object of class Position: Parameters are not empty / undefined, but are also not valid safe integers.`);

        
        this.posX = isNaN(x) ? 0 : x;
        this.posY = isNaN(y) ? 0 : y;
    }

    /**
     * Sets the position
     * @param {Number} [x] 
     * @param {Number} [y]
     */
    setPos(x, y)
    {
        if(typeof x == "number" && !isNaN(x))
            this.posX = x;

        if(typeof y == "number" && !isNaN(y))
            this.posY = y;
    }

    /**
     * Returns the position as an array of numbers
     * @returns {Number[]} [x, y]
     */
    getPosArray()
    {
        return [this.posX, this.posY];
    }

    /**
     * Returns the X position
     * @returns {Number}
     */
    getX()
    {
        return this.posX;
    }

    /**
     * Returns the Y position
     * @returns {Number}
     */
    getY()
    {
        return this.posY;
    }
}

module.exports = Position;
