function setWindowTitle(title)
{
    if(typeof title !== "string")
    {
        if(typeof title.toString == "function")
            title = title.toString();
        else
            throw new TypeError(`Parameter "title" is not of type string (got "${typeof title}")`);
    }

    if(process.platform != "win32")
        process.stdout.write(`\x1b]2;${title}\x1b\x5c`); // *nix doesn't have a "nice" way to set the window title but this escape sequence should be able to do it (for reference search "OSC control sequences" on this page: https://man7.org/linux/man-pages/man4/console_codes.4.html)
    else
        process.title = title; // This should work only on Windows
}

module.exports = setWindowTitle;
