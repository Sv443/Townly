const allOfType = require("../functions/allOfType");
const unused = require("../functions/unused");

const { NoStdinError } = require("./Errors");

const col = require("../objects/colors").fg;

const inputCooldown = 35;


class SelectionMenu
{
    constructor(title, settings)
    {
        if(!process.stdin || !process.stdin.isTTY || typeof process.stdin.setRawMode != "function")
            throw new NoStdinError(`The current terminal doesn't have a stdin stream or is not a compatible TTY terminal.`);


        require("keypress")(process.stdin);

        if(settings == undefined || typeof settings != "object")
        {
            settings = {
                overflow: true,   // if the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side?
                cancelable: true, // whether or not the user can cancel the prompt with the Esc key
            };
        }
        else
        {
            settings = {
                overflow: (typeof settings.overflow == "boolean" ? settings.overflow : true),
                cancelable: (typeof settings.cancelable == "boolean" ? settings.cancelable : true)
            }
        }

        this.promiseRes = () => {};
        this.promiseRej = () => {};
        this.callbackFn = () => {};

        this.title = (typeof title == "string" || typeof title == "number") ? title.toString() : null;
        this.settings = settings;
        this.options = [];
        this.optIndex = 0;
        
        this.locale = {
            escKey: "Esc",
            cancel: "Cancel",
            scroll: "Scroll",
            returnKey: "Return",
            select: "Select"
        };
    }

    setOptions(options)
    {
        if(!Array.isArray(options) || (Array.isArray(options) && !allOfType(options, "string")))
            return `Parameter "options" is not an array of strings`;
        
        this.options = options;
        return true;
    }

    addOption(option)
    {
        if(typeof option != "string")
            return "Parameter \"option\" is not of type string";

        this.options.push(option);

        return true;
    }

    onSubmit(callback_fn)
    {
        return new Promise((pRes, pRej) => {
            this.promiseRes = pRes;
            this.promiseRej = pRej;
            
            if(typeof callback_fn == "function")
                this.callbackFn = callback_fn;
        });
    }

    open()
    {
        if(this.options.length == 0)
            return "No options were set in the FolderPrompt. Use the methods \"setOptions()\" or \"addOption()\" to add some before opening the FolderPrompt.";
        
        this.addListeners();

        this.update();
    }

    /**
     * @private
     */
    update()
    {
        this.clearConsole();

        let logTxt = [];

        if(typeof this.title == "string")
            logTxt.push(`${col.blue}${this.title}${col.rst}\n`);

        this.options.forEach((opt, i) => {
            logTxt.push(`${i == this.optIndex ? `${col.yellow}> ${opt}` : `  ${opt}`}${col.rst}`);
        });

        logTxt.push(`\n\n${this.settings.cancelable ? `[${this.locale.escKey}] ${this.locale.cancel} - ` : ""}[▲ ▼] ${this.locale.scroll} - [${this.locale.returnKey}] ${this.locale.select} `);

        process.stdout.write(logTxt.join("\n"));
    }

    /**
     *@private 
     */
    addListeners()
    {
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (char, key) => {
            unused(char);
            
            if(this.onCooldown || !key)
                return;
    
            this.onCooldown = true;

            setTimeout(() => {
                this.onCooldown = false;
            }, inputCooldown);


            switch(key.name)
            {
                case "c": // exit process if CTRL+C is pressed
                    if(key.ctrl === true)
                        process.exit(0);
                break;
                case "space":
                case "return":
                    // submit currently selected option
                    this.removeListeners();

                    this.execCallbacks();
                break;
                case "s":
                case "down":
                    this.optIndex++;

                    if(this.settings.overflow && this.optIndex > (this.options.length - 1))
                        this.optIndex = 0;
                    else if(this.optIndex > (this.options.length - 1))
                        this.optIndex = (this.options.length - 1);

                    this.update();
                break;
                case "a":
                case "up":
                    if(this.settings.overflow && this.optIndex == 0)
                        this.optIndex = (this.options.length - 1);
                    else if(this.optIndex == 0)
                        this.optIndex = 0;
                    else
                        this.optIndex--;
                    
                    this.update();
                break;
                case "escape":
                    if(this.settings.cancelable)
                    {
                        this.removeListeners();

                        this.execCallbacks(true);
                    }
                break;
            }
        });
        process.stdin.resume();
    }

    /**
     * @private
     */
    execCallbacks(canceled)
    {
        if(typeof canceled != "boolean")
            canceled = false;
        
        let retObj = {
            canceled: canceled,
            option: {
                index: this.optIndex,
                description: this.options[this.optIndex]
            }
        };

        this.clearConsole();

        this.callbackFn(retObj);
        this.promiseRes(retObj);
    }

    /**
     * @private
     */
    removeListeners()
    {
        process.stdin.removeAllListeners(["keypress"]);

        if(!process.stdin.isPaused())
            process.stdin.pause();

        return true;
    }

    close()
    {
        let rmRes = this.removeListeners();
        let upRes = this.update();

        this.clearConsole();

        return (rmRes && upRes);
    }

    /**
     * @private
     */
    clearConsole()
    {
        process.stdout.clearLine();
        process.stdout.cursorTo(0, 0);
        process.stdout.write("\n");

        try
        {
            if(console && console.clear && process.stdout && process.stdout.isTTY)
                console.clear();
            else if(console)
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            else process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }
        catch(err)
        {
            return;
        }
    }
}

module.exports = SelectionMenu;
