import { app, BrowserWindow, WebPreferences } from "electron";

function createWindow()
{
    const isDev = true;

    const devOpts: Partial<WebPreferences> = isDev ? {
        devTools: true,
    } : {
        devTools: false,
    };

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            ...devOpts,
        },
    });

    win.loadFile("index.html");
}

app.on("ready", createWindow);
