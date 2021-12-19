const isEmpty = require("../functions/isEmpty");
const readline = require("readline");
const col = require("../objects/colors");
const isArrayEmpty = require("../functions/isArrayEmpty");

class MenuPrompt
{
    constructor(options)
    {
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this._rl.pause();

        this._closed = false;
        this._active = false;

        if(isEmpty(options))
        {
            options = {
                exitKey: "x",
                optionSeparator: ")",
                cursorPrefix: "─►",
                retryOnInvalid: true,
                onFinished: () => {},
                autoSubmit: false
            };
        }
        else
        {
            if(isEmpty(options.exitKey)) options.exitKey = "";
            if(isEmpty(options.optionSeparator)) options.optionSeparator = ")";
            if(options.cursorPrefix !== "" && isEmpty(options.cursorPrefix)) options.cursorPrefix = "─►";
            if(isEmpty(options.retryOnInvalid)) options.retryOnInvalid = true;
            if(isEmpty(options.onFinished)) options.onFinished = () => {};
            if(isEmpty(options.autoSubmit)) options.autoSubmit = false;
        }
        this._options = options;

        this._results = [];

        this._currentMenu = -1;

        if(!process.stdin.isRaw && typeof process.stdin.setRawMode === "function") // need the extra check for GitHub CI which fails since it doesn't provide a stdin
            process.stdin.setRawMode(true);

        
        this.localization = {
            wrongOption: "Please type one of the green options and press <Return>",
            invalidOptionSelected: "Invalid option selected:",
            exitOptionText: "Exit"
        };

        return this;
    }

    //#MARKER open
    open()
    {
        if(this._active)
            return "This MenuPrompt object was already opened - not opening again";

        if(isEmpty(this._menus))
            return `No menus were added to the MenuPrompt object. Please use the method "MenuPrompt.addMenu()" or supply the menu(s) in the construction of the MenuPrompt object before calling "MenuPrompt.open()"`;

        this._active = true;


        let openMenu = (idx, userFeedback) => {
            if(idx >= this._menus.length || !this._active)
            {
                this.close();
                this._options.onFinished(this._results);
                return;
            }
            else
            {
                this._currentMenu = idx;

                this._clearConsole();

                let currentMenu = {
                    title: "",
                    options: ""
                }

                currentMenu.title = this._menus[idx].title;

                let titleUL = "";
                currentMenu.title.split("").forEach(() => titleUL += "‾");

                let longestOption = 0;
                this._menus[idx].options.forEach(option => longestOption = option.key.length > longestOption ? option.key.length : longestOption);

                this._menus[idx].options.forEach(option => {
                    let optionSpacer = "  ";
                    let neededSpaces = longestOption - option.key.length;
                    for(let i = 0; i < neededSpaces; i++)
                        optionSpacer += " ";
                    
                    currentMenu.options += `${col.fg.green}${option.key}${col.rst}${this._options.optionSeparator}${optionSpacer}${option.description}\n`;
                });

                if(!isEmpty(this._options.exitKey))
                {
                    let exitSpacer = "  ";
                    let neededExitSpaces = longestOption - this._options.exitKey.length;
                    for(let i = 0; i < neededExitSpaces; i++)
                        exitSpacer += " ";
                
                    currentMenu.options += `\n${col.fg.red}${this._options.exitKey}${col.rst}${this._options.optionSeparator}${exitSpacer}${this.localization.exitOptionText}\n`;
                }

                let menuText = `\
${isEmpty(userFeedback) ? "\n\n\n" : `${col.fg.red}❗️ > ${userFeedback}${col.rst}\n\n\n`}${col.fat}${col.fg.cyan}${currentMenu.title}${col.rst}
${col.fg.cyan}${titleUL}${col.rst}
${currentMenu.options}

${this._options.cursorPrefix} \
`;

                let answerCallback = answer => {
                    if(!isEmpty(this._options.exitKey) && answer == this._options.exitKey)
                        return openMenu(++idx);

                    console.log();

                    if(isEmpty(answer) && this._options.retryOnInvalid !== false)
                        return openMenu(idx, this.localization.wrongOption);
                    else
                    {
                        let currentOptions = this._menus[idx].options;
                        let selectedOption = null;
                        currentOptions.forEach((opt, i) => {
                            if(opt.key == answer)
                            {
                                selectedOption = opt;
                                selectedOption["menuTitle"] = this._menus[idx].title;
                                selectedOption["optionIndex"] = i;
                                selectedOption["menuIndex"] = idx;
                            }
                        });

                        if(selectedOption != null)
                        {
                            if(typeof this._results != "object" || isNaN(parseInt(this._results.length)))
                                this._results = [selectedOption];
                            else this._results.push(selectedOption);

                            return openMenu(++idx);
                        }
                        else
                        {
                            return openMenu(idx, `${this.localization.invalidOptionSelected} "${answer.replace(/\n|\r\n/gm, "\\\\n")}"`.toString());
                        }
                    }
                }

                if(!this._options.autoSubmit)
                {
                    this._rl.resume();
                    this._rl.question(menuText, answer => {
                        this._rl.pause();
                        return answerCallback(answer);
                    });
                }
                else
                {
                    this._listenerAttached = true;
                    process.stdout.write(menuText);
                    process.stdin.resume();

                    let keypressEvent = chunk => {
                        if(this._listenerAttached)
                        {
                            process.stdin.pause();
                            removeKeypressEvent();
                            return answerCallback(chunk);
                        }
                    };

                    let removeKeypressEvent = () => {
                        process.stdin.removeListener("keypress", keypressEvent);
                        this._listenerAttached = false;
                    };

                    process.stdin.on("keypress", keypressEvent);
                }
            }
        }

        openMenu(0);
        return true;
    }

    //#MARKER close
    close()
    {
        this._active = false;
        this._closed = true;
        this._currentMenu = -1;
        this._rl.close();
        this._clearConsole();

        return this._results;
    }

    //#MARKER addMenu
    addMenu(menu)
    {
        if(this._closed)
            return `MenuPrompt was already closed, can't add a new menu with "scl.MenuPrompt.addMenu()"`;

        if(!this.validateMenu(menu))
            return `Invalid menu provided in "scl.MenuPrompt.addMenu()"`;

        try
        {
            if(this._menus == undefined)
                this._menus = [];
            this._menus.push(menu);
        }
        catch(err)
        {
            return err;
        }
        return true;
    }

    //#MARKER currentMenu
    currentMenu()
    {
        return this._currentMenu;
    }

    //#MARKER result
    result()
    {
        if(!isEmpty(this._result))
            return this._result;
        else return null;
    }

    //#MARKER validateMenu
    validateMenu(menu)
    {
        let errors = [];

        if(isEmpty(menu))
            throw new Error(`The passed parameter "menu" is not present or empty`);

        if(typeof menu != "object")
            errors.push(`Wrong variable type for parameter "menu". Expected: "object", got "${typeof menu}"`);

        if(Array.isArray(menu))
            errors.push(`"menu" parameter can't be an array`);
        
        if(isEmpty(menu.title) || typeof menu.title != "string")
            errors.push(`"title" property is either not present, empty or not of type "string"`);

        if(isEmpty(menu.options))
            errors.push(`"options" property is not present or of the wrong type. Expected: "object", got: "${typeof menu.options}"`);

        if(!isEmpty(menu.options) && (!Array.isArray(menu.options) || menu.options.length <= 0))
            errors.push(`"options" property has to be an array and has to contain at least one item`);

        if(!isEmpty(menu.options))
            menu.options.forEach((opt, i) => {
                if(Array.isArray(opt))
                    errors.push(`The option with the array index ${i} can't be an array`);

                if(typeof opt.key != "string")
                    errors.push(`Wrong variable type for option.key (at array index ${i}). Expected: "string", got "${typeof opt.key}"`);

                if(typeof opt.description != "string")
                    errors.push(`Wrong variable type for option.description (at array index ${i}). Expected: "string", got "${typeof opt.description}"`);
            });
        
        if(this._options.autoSubmit)
        {
            menu.options.forEach((opt, i) => {
                if(opt.key && opt.key.length > 1)
                    errors.push(`The option "autoSubmit" was set to true but the key of the option with the array index ${i} is more than a single character in length`);
            });
        }


        if(isArrayEmpty(errors))
            return true;
        else return errors;
    }

    //#MARKER _clearConsole
    /**
     * ❌ Private method - don't use ❌
     * @private
     */
    _clearConsole()
    {
        try
        {
            if(console && console.clear && process.stdout && process.stdout.isTTY)
                console.clear();
            else if(console)
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            else
                process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }
        catch(err) // this might be overkill but eh ¯\_(ツ)_/¯
        {
            return;
        }
    }
}
module.exports = MenuPrompt;
