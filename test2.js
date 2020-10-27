const ansi = require("ansi");
const keypress = require("keypress");

let cursor = ansi(process.stdout);
keypress(process.stdin);


/** @type {Number[]} */
let cpos;



keypress.enableMouse(process.stdout);
process.on("exit", () => {
    console.clear();
    keypress.disableMouse(process.stdout);
});


async function doShit()
{
    console.clear();
    // cursor.hide();
    cursor.show();

    for(let y = 0; y < process.stdout.rows; y++)
    {
        for(let x = 0; x < process.stdout.columns; x++)
        {
            if(x == 0)
                process.stdout.write("W");
            else
            {
                if(x != (process.stdout.columns - 1))
                {
                    if(y == 0)
                        process.stdout.write("N");
                    else if(y == (process.stdout.rows - 1))
                        process.stdout.write("S");
                    else
                        process.stdout.write(".");
                }
                else
                    process.stdout.write("E");
            }
        }
        if(y != (process.stdout.rows - 1))
            process.stdout.write("\n");
    }

    setCursorPos(1, 1);


    process.stdin.on("mousepress", (info) => {
        console.log(`got "mousepress" event at ${info.x} x ${info.y}`);
    });


    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("keypress", (ch, key) => {
        if(!key)
            return;

        switch(key.name)
        {
            case "up":
                if(key.ctrl)
                    setCursorPos(cpos[0], cpos[1] - 10);
                else
                    setCursorPos(cpos[0], cpos[1] - 1);
            break;
            case "down":
                if(key.ctrl)
                    setCursorPos(cpos[0], cpos[1] + 10);
                else
                    setCursorPos(cpos[0], cpos[1] + 1);
            break;
            case "left":
                if(key.ctrl)
                    setCursorPos(cpos[0] - 10, cpos[1]);
                else
                    setCursorPos(cpos[0] - 1, cpos[1]);
            break;
            case "right":
                if(key.ctrl)
                    setCursorPos(cpos[0] + 10, cpos[1]);
                else
                    setCursorPos(cpos[0] + 1, cpos[1]);
            break;
            case "return":
                cursor.write("O");
                setCursorPos(cpos[0], cpos[1]);
            break;
            case "c":
                if(key.ctrl)
                    process.exit(0);
            break;
        }
    });
}

function setCursorPos(x, y)
{
    if(x <= 0 || y <= 0)
        return;

    cursor.goto(x, y);
    cpos = [x, y];
}

// function timeout(time)
// {
//     return new Promise((pRes) => {
//         setTimeout(() => pRes(), time);
//     });
// }

doShit()
