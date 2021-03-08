import { textSync, loadFont,  Fonts } from "figlet";


/** A single option of a menu - set to empty string or `null` for a spacer */
export type MenuOption = (string|null);

/**
 * Main menu of the game
 */
export class MainMenu
{
    /**
     * 
     * @param title Name of the game or title of the main menu
     * @param options The selectable options - add empty string or `null` for a spacer
     * @param titleFont 
     */
    constructor(title: string, options: MenuOption[], titleFont: Fonts = "Standard")
    {
        MainMenu.preloadFont(titleFont);
    }

    /**
     * Displays the main menu
     */
    display()
    {

    }

    /**
     * Preloads a font so the menu can be created faster
     * @param font Name of the FIGlet font
     */
    static preloadFont(font: Fonts = "Standard")
    {
        return new Promise<void>((res, rej) => {
            loadFont(font, (err) => {
                if(err)
                    return rej(err);

                return res();
            });
        });
    }
}

let m = new MainMenu("Test", ["New Game", "Continue", null, "Options", null, "Exit"]);