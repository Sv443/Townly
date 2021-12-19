## SvCoreLib - Changelog
### Latest version: [1.14.2](#1142)


<br>

<details><summary><b>Click to expand version history</b></summary>

<br>

> **JSLib-npm**
> 
> - 1.6.x
>     - [1.6.5](#165)
>     - [1.6.6](#166)
> - [1.7.0](#170)
> - [1.8.0](#180)
>     - [1.8.1](#181)
>     - [1.8.2](#182)
>     - [1.8.3](#183)
>     - [1.8.4](#184)
> - [1.9.0](#190)
>     - [1.9.1](#191)
>     - [1.9.2](#192)
>     - [1.9.3](#193)
>     - [1.9.4](#194)
> 
> **SvCoreLib**
> 
> - [1.10.0](#1100)
> - [1.11.0](#1110)
>     - [1.11.1](#1111)
> - [1.12.0](#1120)
> - [1.13.0](#1130)
>     - [1.13.1](#1131)
> - [1.14.0](#1140)
>     - [1.14.1](#1141)
>     - [1.14.2](#1142)
> 
> <br>

</details>

<br><br>

## 1.14.2

- Fixes
    - Fixed `.d.ts` type declarations ([issue #27](https://github.com/Sv443-Network/SvCoreLib/issues/27))
    - Fixed `system.inDebugger()` not detecting debugger ([issue #30](https://github.com/Sv443-Network/SvCoreLib/issues/30))
    - Set `mysql` as a peer dependency ([issue #29](https://github.com/Sv443-Network/SvCoreLib/issues/29))
    - Improved documentation a little bit
- Internal stuff
    - Added CodeQL analysis workflow

<br>

## 1.14.1

- Fixes
    - `filesystem.exists()` can now actually be used 🤦 ([issue #25](https://github.com/Sv443-Network/SvCoreLib/issues/25))

<br>

## 1.14.0

- Additions
    - Added class `StatePromise` that keeps track of the state of a promise
    - Added single-parameter overload to `randRange()`
    - Added string array overload to `generateUUID.custom()`, deprecated older overload
    - `softShutdown()` now accepts a Promise for async code execution before shutdown
- Changes
    - Moved repository to [@Sv443-Network](https://github.com/Sv443-Network)
    - Improved type declaration file (`.d.ts`) by a lot
- Security
    - Audited dependencies

<br>

## 1.13.1

- Security:
    - Fixed vulnerability in package `netmask` ([CVE-2021-28918](https://sick.codes/sick-2021-011))

<br>

## 1.13.0
### Migration warnings:
- You will need to modify all occurrences of [`FolderDaemon`](https://github.com/Sv443/SvCoreLib/blob/master/docs.md#folderdaemon) with the new syntax shown in the docs
- The namespace of a few functions has changed (see changes below)

<br>

- Added functions:
	- `filesystem.exists()` to provide a reimplementation to `fs`' deprecated `exists()` function ([issue #14](https://github.com/Sv443/SvCoreLib/issues/14))
    - `filesystem.ensureDirs()` to ensure a set of directories exists ([issue #18](https://github.com/Sv443/SvCoreLib/issues/18))
    - `filesystem.ensureDirsSync()` synchronous counterpart to `ensureDirs()` ([issue #18](https://github.com/Sv443/SvCoreLib/issues/18))
    - `system.usedHeap()` to get the current heap usage in percent ([issue #19](https://github.com/Sv443/SvCoreLib/issues/19))
- Changes:
    - Replaced `FolderDaemon`'s configuration parameters with a single settings object ([issue #13](https://github.com/Sv443/SvCoreLib/issues/13))
    - Added base class `SCLError` to all errors to implement the `date` property ([issue #17](https://github.com/Sv443/SvCoreLib/issues/17))
    - Moved a few functions to the new `system` namespace:
        - `noShutdown()` - moved to `system`
        - `yesShutdown()` - moved to `system`
        - `softShutdown()` - moved to `system`
        - `inDebugger()` - moved to `system`
        - `setWindowTitle()` - moved to `system`
- Fixed bugs:
    - `isEmpty()` with value `null` threw a TypeError ([issue #15](https://github.com/Sv443/SvCoreLib/issues/15))
    - Package `mysql` isn't included in the dependencies ([issue #21](https://github.com/Sv443/SvCoreLib/issues/21))
    - Definition of `system.softShutdown()`'s callback function was wrong ([issue #20](https://github.com/Sv443/SvCoreLib/issues/20))

<br>

## 1.12.0
- Added functions
	- `sql.sendQuery()` to send SQLI protected queries ([issue #10](https://github.com/Sv443/SvCoreLib/issues/10))
	- `insertValues()` to insert values into a percent-formatted string ([issue #11](https://github.com/Sv443/SvCoreLib/issues/11))
	- `setWindowTitle()` to set the terminal's window title ([issue #12](https://github.com/Sv443/SvCoreLib/issues/12))
- Fixed bugs
    - FolderDaemon didn't work when blacklist pattern array was empty ([issue #6](https://github.com/Sv443/SvCoreLib/issues/6))
    - FolderDaemon didn't call onChanged when file was reset to a previously known file content ([issue #7](https://github.com/Sv443/SvCoreLib/issues/7))
- Added SCL's custom error classes to new namespace `scl.Errors`
- Massively improved the documentation

<br>

## 1.11.1
- My dumbass left some debug text in

<br>

## 1.11.0
### The SelectionMenu update
- Added the class `SelectionMenu` to create a menu with a scrollable list of options a user can select
- Added the function `allOfType()` to see if all items of an array are of a specified type

<br>

## 1.10.0
### The initial release
- Added all features from JSLib-npm v1.9.4
- Added a TypeScript type declaration file so the in-IDE documentation and type safety is even better than before (thanks to @canarado)
- Added the class `FolderDaemon` to supervise a directory for changed files
- Added functions
    - `reserialize()` to copy a JSON-compatible object by value and lose the reference
    - `byteLength()` to return the length of a string in bytes
    - `http.pipeString()` to stream a string into an http request
    - `http.pipeFile()` to stream a file into an http request
    - `http.getClientEncoding()` to get the encoding method a client requested
- Added the `rst` property to `colors.fg` and `colors.bg`
- Remade the documentation to be a bit more clear and better structured (thanks to @ThatCopy for helping)




<br><br><br><br>




# JSLib-npm versions:

<br><br>


## 1.9.4
- Fixed invalid usage of the "SIGKILL" signal in `jsl.softShutdown()` (GitHub issue #49)
- Added function `jsl.randomItem()` that returns a random item of an array

<br><br>

## 1.9.3
- Decreased size of package by adding some files to the `.npmignore` (GitHub issue #45)
- Fixed memory leak issues as all events in `jsl.pause()` are now correctly unregistered (GitHub issue #43)
- Fixed the JSDoc documentation comments for `jsl.seededRNG.generateSeededNumbers()` and some other functions (GitHub issue #44)
- Improved handling of the two separate `package.json` files, for NPM and GPR (GitHub issue #47)
- Modified the `.editorconfig` a bit

<br><br>

## 1.9.2
- Fixed some minor docs issues
- Added Promise return to `jsl.downloadFile()` and `jsl.readdirRecursive()`
- Made "Exit" text localizable in `jsl.MenuPrompt`

<br><br>

## 1.9.1
- `jsl.pause()` now correctly unregisters events, fixing memory leak issues

<br><br>

## 1.9.0
- `jsl.unused()` now has a rest parameter instead of a single parameter
- Added `jsl.removeDuplicates()` to remove duplicate entries in an array
- Added `jsl.pause()` to wait until user confirmation before continuing code execution
- Added a `localization` property to `jsl.MenuPrompt` to enable it for being translated
- Added `jsl.inDebugger()` to check if the process is currently running in a debugger
- Fixed a bug in `jsl.MenuPrompt` by ensuring that the raw mode of the stdin is always set to true

<br><br>

## 1.8.4
- Fixed high severity security vulnerabilities in ESLint's dependencies:
    - acorn https://app.snyk.io/vuln/SNYK-JS-ACORN-559469
    - minimist https://app.snyk.io/vuln/SNYK-JS-MINIMIST-559764

<br><br>

## 1.8.3
- TIL you can't use a previously published and unpublished tag in NPM *sigh #2*

<br><br>

## 1.8.2
- fixed typo in the JSDoc comment for "jsl.randRange()"
- fixed JSDoc typedefs for MenuPrompt
- fixed "directory not found" error in the unit test script
- added GitHub actions scripts to automate building and publishing
- added MenuPrompt option to auto submit the menu after a single char was entered

<br><br>

## 1.8.1
- improvements / fixes:
    - version bumped because GitHub package registry doesn't allow unpublishing *sigh*

<br><br>

## 1.8.0
- new features:
    - function "jsl.seededRNG.generateSeededNumbers(count, seed)" to generate "random" numbers based on a passed seed
    - function "jsl.seededRNG.generateRandomSeed(digitCount)" to generate a random seed to be used in "jsl.generateSeededNumbers()"
    - function "jsl.seededRNG.validateSeed(seed)" to check whether or not a seed is valid
    - function "jsl.mapRange(value, range_1_min, range_1_max, range_2_min, range_2_max)" to transform a value from one numerical range to another
    - function "jsl.downloadFile(url, destPath, options)" to download a file from a URL
    - function "jsl.unused(any_var)" to indicate an unused variable to a linter
    - function "jsl.replaceAt(input: str, index: number, replacement: str)" to replace a character at the specified index of a string with a replacement
    - function "jsl.randomizeArray(array: array)" to randomize the indexes of the items of an array
    - object "colors" to make it easier to add colors to the console output - this will replace "jsl.consoleColor()"
    - class "MenuPrompt" for an interactive menu (directly in the CLI) - methods:
        - "open()" to open the prompt
        - "addMenu()" to add a new menu to the prompt
        - "validateMenu()" to check whether a menu is invalid
        - "currentMenu()" to get the current menu index
        - "close()" to prematurely close the prompt and get the results
        - "result()" to prematurely get the results of the prompt (without closing it)
    - added unit tests for every function, class and object. They can be run with "npm test" or "node unittest"
- improvements / fixes:
    - added support for ESLint (use "npm i --save-dev" and then "npm run lint")
    - improved time measurement system for "jsl.ping()"
    - improved the background stuff in "jsl.ping()" to improve performance
    - added "contentType" property to "jsl.ping()"'s promise callback
    - edited a bunch of functions and methods to throw an error instead of returning it as a string, which could've caused unwanted and unpredictable behavior
    - put the UUID generation inside an object, renamed it and added four new ones:
        - "generateUUID.hexadecimal(format: str, upperCase: bool)" [0-9,a-f/A-F]
        - "generateUUID.alphanumerical(format: str, upperCase: bool)" [0-9,a-z/A-Z]
        - "generateUUID.decimal(format: str)" [0-9]
        - "generateUUID.binary(format: str)" [0-1]
        - "generateUUID.custom(format: str, possibleValues: str)" [Custom]
    - added "contributors" and "documentation" properties to the "jsl.info" object
    - removed the signal "SIGKILL" from the shutdown prevention functions as "SIGKILL" is intended as a signal that forces a process to be exited no matter what
    - rewrote the entire documentation, I'm crying rn
    - restructured the entire script to separate each function into its own file
    - fixed "isEmpty()"'s object-with-length-0-detection

<br><br>

## 1.7.0
- fixed typo in "readme.md"
- added "ProgressBar" class to create a dynamic progress bar
- added function "jsl.readdirRecursive(folder, callback(err, result){})" to read a folder and its subfolders asynchronously
- added function "jsl.readdirRecursiveSync(folder)" to read a folder and its subfolders synchronously
- added function "jsl.readableArray(array, separators, lastSeparator)" to make an array more easily human-readable
- split the package up into three separate files
- removed all dependencies because they are either included by default or their effect was easily recreatable in vanilla JS

<br><br>

## 1.6.6
- removed "jsl.settings" completely
- updated documentation for "jsl.ping()"

<br><br>

## 1.6.5
- changed dependency "perf_hooks" to "execution-time" because a feature was deprecated
- completely deprecated the all-lowercase alias "jsl.isempty()" of the function "jsl.isEmpty()"
- cleaned up the code a bit
