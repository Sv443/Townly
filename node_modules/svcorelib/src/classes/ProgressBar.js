const isEmpty = require("../functions/isEmpty");

class ProgressBar
{
    constructor(timesToUpdate, initialMessage) {
        if(!initialMessage)
            initialMessage = "";
        this.timesToUpdate = timesToUpdate;
        this.iteration = 1;
        this.progress = 0.0;
        this.progressDisplay = "";
        this.filledChar = "■";
        this.blankChar = "─";

        this.finishFunction = () => {};
        this.finishPromise = () => {};

        for(let i = 0; i < this.timesToUpdate; i++) this.progressDisplay += this.blankChar;

        this._update(initialMessage);
    }

    next(message) { // increments the progress bar
        //NOTE: isEmpty check will be executed on _update(), so no need to do it here

        this.progress = (1 / this.timesToUpdate) * this.iteration;

        let pt = "";
        for(let i = 0; i < this.iteration; i++) pt += this.filledChar;
        this.progressDisplay = pt + this.progressDisplay.substring(this.iteration);
        
        this._update(message);
        this.iteration++;
    }

    /**
     * ❌ Private method - don't use ❌
     * @private
     */
    _update(message) { // private method to update the console message
        let escapeRegexChars = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

        if(this.iteration <= this.timesToUpdate) {
            if(!isEmpty(message))
                message = "- " + message;
            else message = "";

            process.stdout.cursorTo(0);
            process.stdout.clearLine();
            process.stdout.write(`${(this.progress != 1.0 ? "\x1b[33m" : "\x1b[32m")}\x1b[1m${Math.round(this.progress * 100)}%\x1b[0m ${(Math.round(this.progress * 100) < 10 ? "  " : (Math.round(this.progress * 100) < 100 ? " " : ""))}[${this.progressDisplay.replace(new RegExp(escapeRegexChars(this.filledChar), "gm"), "\x1b[32m\x1b[1m" + this.filledChar + "\x1b[0m")}] ${message}${(this.progress != 1.0 ? "" : "\n")}`);

            if(this.progress == 1.0)
            {
                this.finishFunction();
                this.finishPromise();
            }
        }
    }

    onFinish(callback)
    {
        return new Promise((pRes) => {
            if(typeof callback == "function")
                this.finishFunction = callback;

            this.finishPromise = pRes;
        });
    }

    getProgress() {
        return this.progress;
    }

    getRemainingIncrements() {
        return (this.timesToUpdate - this.iteration >= 0 ? this.timesToUpdate - this.iteration : 0);
    }
}

module.exports = ProgressBar;
