import { Undefinable } from "tsdef";

import SettingsMenu from "../engine/display/ui/menus/SettingsMenu";


//#MARKER types

export type SettingsMenuOptionType = "checkbox" | "slider" | "text" | "keybind" | "select" | "comment" | "empty";

export type SettingsMenuOptionDefaultValue = number | string | boolean;

export type SettingsMenuOptionAttributes = number[] | string[];

export interface ISettingsMenuOption
{
    [index: string]: string | SettingsMenuOptionType | Undefinable<SettingsMenuOptionAttributes> | SettingsMenuOptionDefaultValue;

    /** ID of this option - dictates property names when serializing */
    id: string;
    /** The text / description of this option */
    text: string;
    /** The type of this option */
    type: SettingsMenuOptionType;
    /** The attributes to pass onto the option renderer */
    attributes?: SettingsMenuOptionAttributes;
    /** Default value of this option */
    initial?: SettingsMenuOptionDefaultValue;
}

export interface ISettingsOption
{
    [index: string]: string | Undefinable<ISettingsMenuOption[]>;

    /** Name of the category */
    category: string;
    /** Options under this category */
    options: ISettingsMenuOption[];
}


//#MARKER class

export class GameSettings extends SettingsMenu
{
    private gameSettingsOptions: Undefinable<ISettingsOption[]> = undefined;
    /** The horizontally scrolling settings categories */
    private categories: ISettingsOption[] = [];
    /** Which category is currently selected */
    private categoryIndex = 0;


    constructor()
    {
        super("Settings", undefined, "Standard");


        this.setGameSettingsOptions(GameSettings.getSettingsOptions());
    }

    setGameSettingsOptions(options: ISettingsOption[]): void
    {
        this.gameSettingsOptions = options;
        this.categories = [];

        this.gameSettingsOptions.forEach(settOpt => {
            this.categories.push(settOpt);

            const { category, options } = settOpt;

            options.forEach(opt => {
                const { id, type, text, attributes, initial } = opt;

                // TODO: do stuff
            });
        });
    }

    draw(): void
    {
        // TODO: menu needs a whole other design, with 2 axis scrolling and dynamic input UI "widgets":
    }

    //#MARKER static

    static getSettingsOptions(): ISettingsOption[]
    {
        return [
            {
                category: "General",
                options: [
                    {
                        id: "disable-audio",
                        text: "Disable Audio Module",
                        type: "checkbox",
                    },
                    {
                        id: "audio-volume",
                        text: "Audio Volume",
                        type: "slider",
                        attributes: [ 0, 10 ],
                    },
                    {
                        id: "cursor-style",
                        text: "Cursor Style",
                        type: "select",
                        attributes: [ "Native", "Custom" ],
                    },
                    {
                        id: "space-1",
                        text: "",
                        type: "empty",
                    },
                    {
                        id: "comment-padding",
                        text: "Padding:",
                        type: "comment"
                    },
                    {
                        id: "padding-hor",
                        text: "Horizontal Padding",
                        type: "slider",
                        attributes: [ 0, 150 ],
                    },
                    {
                        id: "padding-vert",
                        text: "Vertical Padding",
                        type: "slider",
                        attributes: [ 0, 150 ],
                    }
                ]
            },
            {
                category: "Controls",
                options: [
                    {
                        id: "comment-actions",
                        text: "Actions:",
                        type: "comment",
                    },
                    {
                        id: "action-pause-menu",
                        text: "Pause Menu",
                        type: "keybind",
                        initial: "escape", // TODO: verify
                    },
                    {
                        id: "action-switch-info-mode",
                        text: "Switch Info Mode",
                        type: "keybind",
                        initial: "tab", // TODO: verify
                    },
                    {
                        id: "action-inspect-cell",
                        text: "Inspect Cell",
                        type: "keybind",
                        initial: "return",
                    },
                    {
                        id: "space-1",
                        text: "",
                        type: "empty",
                    },
                    {
                        id: "comment-movement",
                        text: "Movement:",
                        type: "comment",
                    },
                    {
                        id: "movement-up",
                        text: "Move Camera Up",
                        type: "keybind",
                        initial: "up",
                    },
                    {
                        id: "movement-down",
                        text: "Move Camera Down",
                        type: "keybind",
                        initial: "down",
                    },
                    {
                        id: "movement-left",
                        text: "Move Camera Left",
                        type: "keybind",
                        initial: "left",
                    },
                    {
                        id: "movement-right",
                        text: "Move Camera Right",
                        type: "keybind",
                        initial: "right",
                    },
                    {
                        id: "movement-up-2",
                        text: "Move Camera Up #2",
                        type: "keybind",
                        initial: "w",
                    },
                    {
                        id: "movement-down-2",
                        text: "Move Camera Down #2",
                        type: "keybind",
                        initial: "s",
                    },
                    {
                        id: "movement-left-2",
                        text: "Move Camera Left #2",
                        type: "keybind",
                        initial: "a",
                    },
                    {
                        id: "movement-right-2",
                        text: "Move Camera Right #2",
                        type: "keybind",
                        initial: "d",
                    }
                ]
            }
        ];
    }
}
