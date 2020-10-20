const Position = require("./Position");


/** @typedef {"up"|"down"|"left"|"right"} Direction */

class Camera
{
    /**
     * Constructs a new object of class Camera
     * @param {Number[]} windowSize [width, height]
     */
    constructor(windowSize)
    {
        this.windowSize = windowSize;
        /** @type {Position} Position relative to the viewport / window */
        this.pos = new Position(0, 0);

        process.stdout.on("resize", () => {
            this.onWindowSizeChange(Camera.getWindowSize());
        });
    }

    /**
     * Returns the window size in columns and rows
     * @prop {Number[]} [padding] [ver, hor] - defaults to [0, 0]
     * @returns {Number[]} [H, W]  /  [Rows, Cols]
     * @static
     */
    static getWindowSize(padding)
    {
        if(!padding || !Array.isArray(padding))
            padding = [0, 0];

        return [ (process.stdout.rows - padding[0]), (process.stdout.columns - padding[1]) ] || [ 0, 0 ];
    }

    /**
     * Sets the camera's position
     * @param {Position} position
     */
    setCameraPos(position)
    {
        this.pos = position;
    }

    /**
     * Returns the camera's current position
     * @returns {Position}
     */
    getCameraPos()
    {
        return this.pos;
    }
    
    /**
     * Moves the camera in a certain direction
     * @param {Direction} direction 
     * @param {Number} [amount] If left empty, defaults to 1 
     * @returns {Boolean} Returns true if the camera could be moved, false if not
     */
    move(direction, amount)
    {
        if(typeof amount != "number")
            amount = 1;

        amount = parseInt(amount);
        
        if(amount <= 0 || isNaN(amount));
            amount = 1;
        
        let curPos = this.pos.getPosArray();

        switch(direction)
        {
            case "up":
                if(curPos[1] == 0)
                    return false;

                curPos[1] -= amount;
            break;
            case "down":
                if(curPos[1] == this.windowSize[1])
                    return false;

                curPos[1] += amount;
            break;
            case "left":
                if(curPos[0] == 0)
                    return false;

                curPos[0] -= amount;
            break;
            case "right":
                if(curPos[0] == this.windowSize[0])
                    return false;

                curPos[0] += amount;
            break;
        }

        this.pos.setPos(curPos);
        return true;
    }

    /**
     * To be called each time the window size changes
     * @param {Number[]} newWindowSize [width, height]
     * @private
     */
    onWindowSizeChange(newWindowSize)
    {
        this.windowSize = newWindowSize;
    }
}

module.exports = Camera;
