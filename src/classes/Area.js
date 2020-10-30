const Pos = require("./Position");


/** @typedef {"tl"|"br"} CornerName */
/**
 * @typedef {Object} CornersObj
 * @prop {Pos|null} tl Position of the top-left corner - is null if not set yet
 * @prop {Pos|null} br Position of the bottom-right corner - is null if not set yet
 */

/**
 * This holds the information about a two-dimensional, rectangular area, or the area between the provided top-left and bottom-right corners.
 */
class Area
{
    /**
     * Constructs a new object of class Area  
     * This class holds the information about a two-dimensional, rectangular area
     * @param {Pos} [cornerTL] The position of the top-left corner of this area
     * @param {Pos} [cornerBR] The position of the bottom-right corner of this area
     */
    constructor(cornerTL, cornerBR)
    {
        /** @type {CornersObj} */
        this.corners = {};

        if(cornerTL instanceof Pos)
            this.corners.tl = cornerTL;
        if(cornerBR instanceof Pos)
            this.corners.br = cornerBR;
    }

    /**
     * Sets or modifies a single corner of this area
     * @param {CornerName} corner Which corner to modify / set
     * @param {Pos} position 
     */
    setCorner(corner, position)
    {
        if(!(position instanceof Pos))
            throw new TypeError(`Error while setting a corner of an area: Parameter "position" is not an instance of class Pos`);
        
        switch(corner)
        {
            case "tl":
                this.corners.tl = corner;
            break;
            case "br":
                this.corners.br = corner;
            break;
            default:
                throw new TypeError(`Error while setting a corner of an area: Parameter "corner" is not a valid corner name`);
        } 
    }

    /**
     * Sets or modifies one or both corners of this area
     * @param {Pos} [cornerTL] The position of the top-left corner of this area
     * @param {Pos} [cornerBR] The position of the bottom-right corner of this area
     */
    setCorners(cornerTL, cornerBR)
    {
        if(cornerTL instanceof Pos)
            this.corners.tl = cornerTL;

        if(cornerBR instanceof Pos)
            this.corners.br = cornerBR;
    }

    /**
     * Returns the position of the specified corner
     * @param {CornerName} corner 
     * @returns {Pos|null} Returns null if the specified corner was not set yet
     * @throws TypeError if "corner" is not a valid corner name
     */
    getCorner(corner)
    {
        switch(corner)
        {
            case "tl":
                if(this.corners.tl instanceof Pos)
                    return this.corners.tl;
                else
                    return null;
            case "br":
                if(this.corners.br instanceof Pos)
                    return this.corners.br;
                else
                    return null;
            default:
                throw new TypeError(`Error while getting corner of area: Parameter "corner" is not a valid corner type`);
        }
    }

    /**
     * Returns this area's corners wrapped in an object
     * @returns {CornersObj}
     */
    getCorners()
    {
        return this.corners;
    }

    /**
     * Returns the size of this area as an array of numbers
     * @returns {Number[]} [width, height]
     */
    getSize()
    {
        let [Xtl, Ytl] = this.corners.tl.getPosArray();
        let [Xbr, Ybr] = this.corners.br.getPosArray();

        // Formulas:
        // w = (Xbr - Xtl) + 1
        // h = (Ybr - Ytl) + 1

        let width = (Xbr - Xtl) + 1;
        let height = (Ybr - Ytl) + 1;

        return [width, height];
    }
}

module.exports = Area;
