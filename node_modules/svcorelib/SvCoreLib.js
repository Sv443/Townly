// SvCoreLib by Sv443 - licensed under the MIT license: https://sv443.net/LICENSE
// For more information, please read the `README.md` file or go to https://github.com/Sv443-Network/SvCoreLib#readme

module.exports = Object.freeze({
    //#MARKER functions

    isEmpty:           require("./src/functions/isEmpty"),
    isArrayEmpty:      require("./src/functions/isArrayEmpty"),
    error:             require("./src/functions/error"),
    allEqual:          require("./src/functions/allEqual"),
    allOfType:         require("./src/functions/allOfType"),
    reserialize:       require("./src/functions/reserialize"),
    readableArray:     require("./src/functions/readableArray"),
    mapRange:          require("./src/functions/mapRange"),
    unused:            require("./src/functions/unused"),
    replaceAt:         require("./src/functions/replaceAt"),
    byteLength:        require("./src/functions/byteLength"),
    randRange:         require("./src/functions/randRange"),
    randomizeArray:    require("./src/functions/randomizeArray"),
    randomItem:        require("./src/functions/randomItem"),
    removeDuplicates:  require("./src/functions/removeDuplicates"),
    insertValues:      require("./src/functions/insertValues"),
    seededRNG: {
        generateSeededNumbers:  require("./src/functions/seededRNG/generateSeededNumbers"),
        generateRandomSeed:     require("./src/functions/seededRNG/generateRandomSeed"),
        validateSeed:           require("./src/functions/seededRNG/validateSeed"),
    },
    generateUUID: {
        hexadecimal:     require("./src/functions/generateUUID/hexadecimal"),
        decimal:         require("./src/functions/generateUUID/decimal"),
        alphanumerical:  require("./src/functions/generateUUID/alphanumerical"),
        binary:          require("./src/functions/generateUUID/binary"),
        custom:          require("./src/functions/generateUUID/custom"),
    },
    http: {
        pipeFile:           require("./src/functions/http/pipeFile"),
        pipeString:         require("./src/functions/http/pipeString"),
        getClientEncoding:  require("./src/functions/http/getClientEncoding"),
        ping:               require("./src/functions/http/ping"),
    },
    filesystem: {
        readdirRecursive:      require("./src/functions/filesystem/readdirRecursive"),
        readdirRecursiveSync:  require("./src/functions/filesystem/readdirRecursiveSync"),
        logger:                require("./src/functions/filesystem/logger"),
        downloadFile:          require("./src/functions/filesystem/downloadFile"),
        ensureDirs:            require("./src/functions/filesystem/ensureDirs"),
        ensureDirsSync:        require("./src/functions/filesystem/ensureDirsSync"),
        exists:                require("./src/functions/filesystem/exists"),
    },
    sql: {
        sendQuery:  require("./src/functions/sql/sendQuery"),
    },
    system: {
        usedHeap:        require("./src/functions/system/usedHeap"),
        inDebugger:      require("./src/functions/system/inDebugger"),
        softShutdown:    require("./src/functions/system/softShutdown"),
        noShutdown:      require("./src/functions/system/noShutdown"),
        yesShutdown:     require("./src/functions/system/yesShutdown"),
        setWindowTitle:  require("./src/functions/system/setWindowTitle"),
    },
    pause:   require("./src/functions/system/pause"),
    
    //#MARKER classes
    
    ProgressBar:    require("./src/classes/ProgressBar"),
    MenuPrompt:     require("./src/classes/MenuPrompt"),
    FolderDaemon:   require("./src/classes/FolderDaemon"),
    SelectionMenu:  require("./src/classes/SelectionMenu"),
    StatePromise:   require("./src/classes/StatePromise"),

    //#SECTION namespaced classes

    Errors:         require("./src/classes/Errors"),

    //#MARKER objects

    info:    require("./src/objects/info"),
    colors:  require("./src/objects/colors")
});
