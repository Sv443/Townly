import { app, BrowserWindow } from "electron";
import { join } from "path";


let win: BrowserWindow | null = null;


function preInit()
{
    app.on("ready", init);

    app.on("window-all-closed", () => {
        app.quit();
    });
}

async function init()
{
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.on("closed", () => {
        win = null;
    });

    await win.loadFile(srcPath("menu/index.html"));

    win.webContents.openDevTools();
}


function srcPath(file: string)
{
    return join(__dirname, "../src/", file);
}


(() => preInit())();
