const scl = require("svcorelib");


/**
 * @typedef {Object} SelectionMenuSettings
 * @prop {Boolean} [cancelable] Whether or not the user can cancel the prompt with the Esc key
 * @prop {Boolean} [overflow] If the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side?
 */

class CustomSelectionMenu extends scl.SelectionMenu
{
    /**
     * The SelectionMenu is an interactive menu in the Command Line Interface with a list of options that can be scrolled through and selected. 🔹
     * @param {String} title The title of the menu. Leave undefined to not have a title.
     * @param {SelectionMenuSettings} settings The settings of the menu. Leave undefined for the default settings to be applied.
     * @throws Throws a NoStdinError when the currently used terminal doesn't have a stdin stream or isn't a compatible TTY terminal.
     */
    constructor(title, settings)
    {
        super(title, settings);
        
        this.onCursorMoveFn = () => {};
    }

    onCursorMove(callback_fn)
    {
        this.onCursorMoveFn = callback_fn;
    }

    addListeners()
    {
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (char, key) => {
            scl.unused(char);
            
            if(this.onCooldown || !key)
                return;
    
            this.onCooldown = true;

            setTimeout(() => {
                this.onCooldown = false;
            }, 35);


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

                    this.onCursorMoveFn();
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

                    this.onCursorMoveFn();
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

    clearConsole()
    {
        return;
    }
}

module.exports = CustomSelectionMenu
