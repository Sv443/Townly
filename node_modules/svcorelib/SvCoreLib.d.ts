/*
    TypeScript Type Declaration file
    Original declarations made by @canarado


    >> If you came here looking for the source code, you're in the wrong file!
    >> See the file `SvCoreLib.js` instead, it acts as a proxy to all of SCLs features.
    >> From there, you can follow the require()'s.

    >> This file is responsible for the In-IDE documentation and explicit types (usually seen by pressing CTRL+Space or hovering over stuff)
*/


import { ServerResponse, IncomingMessage } from "http";
import { Connection, QueryOptions } from "mysql";


/**
 * Describes an object that is JSON-compatible, aka doesn't contain self- / circular references or non-primitive JS properties  
 * [Source](https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717)
 */
export type JSONCompatible =  boolean | number | string | null | JSONArray | JSONMap;
interface JSONMap { [key: string]: JSONCompatible; }
interface JSONArray extends Array<JSONCompatible> {}

/**
 * Describes a value that has a `.toString()` method, meaning it can be converted to a string
 */
export interface Stringifiable {
    toString(): string;
}

/**
 * ![icon](https://sv443.net/resources/images/svcorelib_tiny.png)  
 * 
 * ## SvCoreLib  
 * #### The core library used in almost all projects of the [Sv443 Network](https://sv443.net/) and [Sv443](https://github.com/Sv443)  
 *   
 * ---
 *   
 * **[Documentation](https://github.com/Sv443-Network/SvCoreLib/blob/master/docs.md#readme) • [Changelog](https://github.com/Sv443-Network/SvCoreLib/blob/master/changelog.md#readme) • [GitHub Repo](https://github.com/Sv443-Network/SvCoreLib) • [Discord](https://dc.sv443.net)**
 * 
 * ---
 *   
 * If you like this library please consider [supporting me ❤](https://github.com/sponsors/Sv443)
 *   
 * 
 * @author Sv443
 * @license [MIT](https://sv443.net/LICENSE)
 * @version 1.14.2
 * @module svcorelib
 */
declare module "svcorelib" {
    //#MARKER functions



    //#SECTION Miscellaneous

    /**
     * 🔹 Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0.  
     * Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed! 🔹
     * @param input Variable that should be checked - this can be of any type but the basic types will work best
     * @returns true, if empty or false, if not
     * @since 1.4.0
     * @version 1.6.5 lowercase alias scl.isempty was removed
     * @version 1.8.0 Added check for objects with length = 0
     * @version 1.13.0 Fixed TypeError when input is `null`
     */
    function isEmpty<T>(input: T): boolean;

    /**
     * 🔹 Checks how many values of the array are empty (does the same check as `scl.isEmpty()`, but on each array item) 🔹
     * @param array Array that should be checked
     * @returns true if all are empty, false if none are empty and number if only some are empty
     * @throws Throws an error if the parameter isn't an array
     * @since 1.5.0
     * @version 1.8.0 Throwing error now instead of returning string
     */
    function isArrayEmpty<T>(array: T[]): boolean | number;

    /**
     * 🔹 Sends a red console message and optionally exits the process with an optional status code. 🔹
     * @param cause The cause of the error
     * @param log_file_path if the error message should automatically be logged to the file with the specified path. undefined or null to disable.
     * @param shutdown if the process should be exited or not
     * @param status with which status code the process should be exited
     * @param consoleMsg whether to show a red message in the console or not
     * @throws Throws an error if the "cause" parameter isn't a string
     * @since 1.5.0
     * @version 1.8.0 Throwing error now instead of logging to console and returning undefined
     */
    function error(cause: string, log_file_path?: string, shutdown?: boolean, status?: number, consoleMsg?: boolean): void;

    /**
     * 🔹 Tests an array and returns true if all values are equal. 🔹
     * @param array The array you want to test
     * @param loose Set to `true` to use loose equality comparison instead of strict equality comparison. Defaults to `false`
     * @returns true if all values are equal, false if not
     * @throws Throws an error if the parameter is not an array
     * @since 1.5.0
     * @version 1.8.0 Throwing error now instead of returning string
     */
    function allEqual<T>(array: T[], loose?: boolean): boolean;

    type JSPrimitiveTypeName = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";

    /**
     * 🔹 Tests if all items of an array are of the specified type. 🔹
     * @param array The array you want to test
     * @param type The type you want to test the array's items on
     * @returns true if all items are of the specified type, false if not
     * @throws Throws a TypeError if the first parameter is not an array or if the second parameter is not a valid primitive data type name
     * @since 1.11.0
     */
    function allOfType<T>(array: T[], type: JSPrimitiveTypeName): boolean;

    /**
     * 🔹 Reserializes a JSON-compatible object. This means it copies the value of an object and loses the internal reference to it.  
     * Using an object that contains special JavaScript classes or a circular structure will result in unexpected behavior. 🔹
     * @param obj The object you want to reserialize - if this is not of type `object`, you will just get the original value back
     * @param immutable Set this to `true` if you want to make the returned object immutable (its properties can't be modified)
     * @returns Returns the reserialized object or the original value if it is not of type `object`
     * @since 1.10.0
     */
    function reserialize(obj: JSONCompatible, immutable?: boolean): JSONCompatible;

    /**
     * 🔹 Converts an array to a better readable one 🔹
     * @param array The array you want to make readable
     * @param separators The default separator for all values except the last one. Defaults to `, ` if left empty. Add whitespaces if needed!
     * @param lastSeparator The last separator. Defaults to ` and ` if empty. Add whitespaces if needed!
     * @returns Better readable array as string
     * @since 1.7.0
     */
    function readableArray(array: (string | Stringifiable)[], separators?: string, lastSeparator?: string): string;

    /**
     * 🔹 Transforms the `value` parameter from the numerical range [`range_1_min`-`range_1_max`] to the numerical range [`range_2_min`-`range_2_max`] 🔹
     * @param value The value from the first numerical range, that you want to transform to a value inside the second numerical range
     * @param range_1_min The lowest possible value of the first numerical range
     * @param range_1_max The highest possible value of the first numerical range
     * @param range_2_min The lowest possible value of the second numerical range
     * @param range_2_max The highest possible value of the second numerical range
     * @returns Floating point number of `value` inside the second numerical range
     * @throws Throws an error if the arguments are not of type `Number` or the `*_max` argument(s) is/are equal to 0
     * @since 1.8.0
     */
    function mapRange(value: number, range_1_min: number, range_1_max: number, range_2_min: number, range_2_max: number): number;

    /**
     * 🔹 Use this if you are using a linter that complains about unused vars.  
     * As this function basically does nothing, you can even leave it in once the variable is used again and nothing will break. 🔹
     * @param variables Any amount of variable(s) of any type
     * @since 1.8.0
     * @version 1.9.0 Function now accepts an infinite number of parameters
     */
    function unused(...variables: any): void;

    /**
     * 🔹 Replaces a character from the specified `string` at the specified `index` with the value of `replacement` 🔹
     * @param input The input string
     * @param index The zero-based index of the char you want to replace
     * @param replacement What you want the char to be replaced with
     * @since 1.8.0
     */
    function replaceAt(input: string, index: number, replacement: string): string;

    /**
     * 🔹 Waits for the user to press a key and then resolves a Promise 🔹
     * @param text The text to display - if left empty this defaults to "Press any key to continue..."
     * @returns Passes the pressed key in the resolution or the error message in the rejection
     * @since 1.9.0
     * @version 1.9.3 Events are now being correctly unregistered
     */
    function pause(text?: string): Promise<string>;

    /**
     * 🔹 Returns the length of a string in bytes.  
     * Passing anything other than a string will return `-1` 🔹
     * @param str
     * @since 1.10.0
     */
    function byteLength(str: string): number;

    //#SECTION randomization

    /**
     * 🔹 Highly random number generator with upper and lower boundary. 🔹  
     *   
     * ❗ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function! ❗
     * @param min Lower boundary of the RNG
     * @param max Upper boundary of the RNG
     * @throws Throws a TypeError if the arguments are not of type `number`
     * @since 1.5.0
     */
    function randRange(min: number, max: number): number;

    /**
     * 🔹 Highly random number generator with upper boundary.  
     * This overload automatically sets the lower boundary to 0. 🔹  
     *   
     * ❗ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function! ❗
     * @param max Upper boundary of the RNG - using this overload will set the lower boundary to 0
     * @throws Throws a TypeError if the arguments are not of type `number`
     * @since 1.14.0
     */
     function randRange(max: number): number;

    /**
     * 🔹 Randomizes all items in an array and returns it 🔹
     * @param array The array that should be randomized
     * @returns Returns the randomized array
     * @throws Throws an error if the parameter is not an array
     * @since 1.8.0
     */
    function randomizeArray<T>(array: T[]): T[];

    /**
     * 🔹 Chooses a random item in an array and returns it 🔹
     * @param array An array of any size, with any values contained inside
     * @returns Returns a random item of the provided array
     * @since 1.9.4
     */
    function randomItem<T>(array: T[]): T;

    /**
     * 🔹 Removes duplicate items in an array 🔹
     * @param array An array with any values
     * @since 1.9.0
     */
    function removeDuplicates<T>(array: T[]): T[];

    /**
     * 🔹 Inserts values into a percent-formatted string.  
     * If there are no insertion marks, this function returns the unmodified input string. 🔹
     * @param str A string containing numbered insertion marks (%1, %2, ..., %10, %11, ...)
     * @param values [Rest parameter] The values to insert into the string - All values that are not of type `string` will be attempted to be converted using their method `.toString()`
     * @throws Throws a "TypeError" if the parameter `str` is not a string or if one of the values could not be converted to a string
     * @since 1.12.0
     */
    function insertValues(str: string, ...values: (string | Stringifiable)[]): string;

    /**
     * 🔸 Offers a few functions to generate seeded random numbers.  
     * This means using the same input seed, you will always get the same output number, just like you get the same Minecraft world when using the same seed twice. 🔸
     */
    namespace seededRNG {
        /**
         * Represents a seed to be used in functions of the `seededRNG` namespace.  
         * Note that seeds can't start with the number `0` as they need to be compatible with both `string` and `number` types
         */
        type Seed = (number | string);

        /**
         * Describes a set of numbers generated or needed by functions of the `seededRNG` namespace
         */
        interface SeededRandomNumbers
        {
            [key: string]: number[] | string | number;

            /** An array of the random numbers */
            numbers: number[];
            /** The random numbers, but as a string */
            stringified: string;
            /** The random numbers, but as an integer */
            integer: number;
            /** The seed that was used to create the random numbers */
            seed: number;
        }
        
        /**
         * 🔹 Generates random numbers from the numerical range [0-9] based on a seed.  
         * To make sure the seed is valid, you can use the function `validateSeed()`. 🔹
         * @param count How many random numbers should be generated - will default to 16 if left empty
         * @param seed The seed to generate numbers from. Leave empty to use a random default seed. The used seed will be included in the returned object
         * @returns An object containing the seed and the random number in three different formats
         * @since 1.8.0
         */
        function generateSeededNumbers(count?: number, seed?: Seed): SeededRandomNumbers;
        
        /**
         * 🔹 Creates a random seed 🔹
         * @param digitCount How many digits the seed should have - defaults to 10 if left empty
         * @since 1.8.0
         */
        function generateRandomSeed(digitCount?: number): number;
        
        /**
         * 🔹 Validates a seed to be used in `generateSeededNumbers()` 🔹
         * @param seed The seed to validate
         * @since 1.8.0
         */
        function validateSeed(seed: Seed): boolean;
    }

    /**
     * 🔸 Offers many functions to generate Universally Unique Identifiers (UUIDs) 🔸
     */
    namespace generateUUID {
        /**
         * 🔹 Creates an alphanumerical [0-9,A-Z] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @param upperCase Set to true to have all letters in upper case, false for lower case
         * @since 1.8.0
         */
        function alphanumerical(uuidFormat: string, upperCase?: boolean): string;
        
        /**
         * 🔹 Creates a binary [0-1] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @param asBooleanArray Set to true to get an array of booleans instead of a string of 1 and 0. Setting this to true will ignore the uuidFormat parameter. Instead, the amount of x's and y's will be equivalent to the resulting array items.
         * @since 1.8.0
         */
        function binary(uuidFormat: string, asBooleanArray?: boolean): string | boolean[];
        
        /**
         * ❌ Warning: This overload is deprecated! Please use the other one. ❌  
         *   
         * 🔹 Creates a custom UUID with a given format from a list of characters specified by the possibleValues parameter. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @param possibleValues A string containing all characters that can be injected into the final UUID - (delimited by nothing) - Example: "ABCDEF01234$%&#"
         * @since 1.8.0
         * @deprecated
         */
        function custom(uuidFormat: string, possibleValues: string): string;

        /**
         * 🔹 Creates a custom UUID with a given format from a list of characters specified by the possibleValues parameter. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @param possibleValues An array containing all characters that can be injected into the final UUID
         * @since 1.14.0
         */
        function custom(uuidFormat: string, possibleValues: (string | Stringifiable)[]): string;
        
        /**
         * 🔹 Creates a decimal [0-9] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @since 1.8.0
         */
        function decimal(uuidFormat: string): string;
        
        /**
         * 🔹 Creates a hexadecimal [0-9,A-F] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
         * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, escape (prefix) it with this character: `^`
         * @param upperCase Set to true to have all letters in upper case, false for lower case
         * @since 1.5.0
         * @version 1.8.0 Renamed the function and moved it
         */
        function hexadecimal(uuidFormat: string, upperCase?: boolean): string;
    }

    //#SECTION http

    /**
     * 🔸 Offers a few functions that work in conjunction with Node's builtin `http` and `https` modules 🔸
     */
    namespace http {
        /**
         * An encoding's identifier / name
         */
        type EncodingName = ("br" | "gzip" | "deflate" | "compress" | "identity");

        /**
         * 🔹 Pipes a file into a HTTP response. This is a tiny bit faster and much more efficient than loading the file into RAM first. 🔹
         * @param res The HTTP res object
         * @param filePath Path to the file to respond with - relative to the project root directory
         * @param mimeType The MIME type to respond with - defaults to "text/plain" if left empty
         * @param statusCode The status code to respond with - defaults to 200
         * @returns Returns `null` if there was no error or a string containing the error message
         * @throws Throws an "InvalidMimeTypeError" if the provided "mimeType" parameter is not a valid MIME type
         */
        function pipeFile(res: ServerResponse, filePath: string, mimeType?: string, statusCode?: number): null | string;
        
        /**
         * 🔹 Pipes a string into a HTTP response. This is a tiny bit faster and much more efficient than loading the string into RAM first. 🔹
         * @param res The HTTP res object
         * @param text The response body
         * @param mimeType The MIME type to respond with - defaults to "text/plain" if left empty
         * @param statusCode The status code to respond with - defaults to 200
         * @returns Returns `null` if there was no error or a string containing the error message
         * @throws Throws an "InvalidMimeTypeError" if the provided "mimeType" parameter is not a valid MIME type
         */
        function pipeString(res: ServerResponse, text: string, mimeType?: string, statusCode?: number): null | string;
        
        /**
         * 🔹 Returns the name of the client's accepted encoding.  
         * If the client supports multiple encodings, returns the most efficient and modern encoding.  
         * For more information, visit the [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) 🔹
         * @param req The HTTP `req` object
         * @returns Returns "identity" if no encodings are supported, else returns the encoding's name
         * @since 1.10.0
         */
        function getClientEncoding(req: IncomingMessage): EncodingName;

        /**
         * This object contains the return values of a ping
         */
        interface PingReturnValues
        {
            [key: string]: number | string;

            /** The ping's returned status code (eg. 200 or 404) */
            statusCode: number;
            /** The status message of the ping - Could be something like "Ok" for status 200 or "Not Found" for status 404 */
            statusMessage: string;
            /** The response time in milliseconds as an integer */
            responseTime: number;
            /** The `content-type` header - this will contain the MIME type and the content encoding */
            contentType: string;
        }

        /**
         * 🔹 Pings the specified URL and returns the status code 🔹
         * @param url The URL that should be pinged
         * @param timeout time in milliseconds after which the ping will time out and return a 404 error - defaults to 5000 ms
         * @returns Promise gets passed the HTTP status code (for example 200 or 404), the status message and the response duration in ms; if errored returns a string with the error message
         * @throws Throws an error if the `url` parameter is not present or malformatted
         * @since 1.6.0
         * @version 1.6.1 changed attributes
         * @version 1.6.5 changed time measurement dependency due to deprecation
         * @version 1.6.6 updated documentation for the resulting object
         * @version 1.8.0 changed time measurement method to be a much more accurate one
         */
        function ping(url: string, timeout?: number): Promise<PingReturnValues>;
    }

    //#SECTION networking

    interface DownloadProgress
    {
        [key: string]: number;

        /** The current download progress in bytes */
        currentB: number;
        /** The current download progress in kilobytes */
        currentKB: number;
        /** The current download progress in megabytes */
        currentMB: number;
        /** The total file size in bytes */
        totalB: number;
        /** The total file size in kilobytes */
        totalKB: number;
        /** The total file size in megabytes */
        totalMB: number;
    }

    interface ProgressCallback
    {
        [key: string]: DownloadProgress;

        /** This object contains the current progress of the download */
        DownloadProgress: DownloadProgress;
    }

    interface FinishedCallback
    {
        [key: string]: string | null;

        /** This parameter is null if no error was encountered, or contains a string if an error was encountered */
        error: string | null;
    }

    interface DownloadOptions
    {
        [key: string]: string | ProgressCallback | FinishedCallback;

        /** The name that the downloaded file should be saved as, including the file extension - for example: "image.png" or "archive.zip" - defaults to "download.txt" */
        fileName: string;
        /** A callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress - sometimes the download progress can't be gotten so this callback won't contain the total size or will not be called a final time on finish. This behavior is normal. */
        progressCallback: ProgressCallback;
        /** A callback function that gets called when the download finished and gets passed a parameter that is `null` if no error was encountered, or contains a string if an error was encountered */
        finishedCallback: FinishedCallback;
    }

    /**
     * 🔹 Downloads a file from the specified URL, to the specified destination path, according to the specified options 🔹
     * @param url The URL to the file you want to download
     * @param destPath The path where the file should be saved to - can be absolute or relative - If left empty, it will default to the root directory of the project - **❗ Do not include the file name here - set it in the `options` parameter ❗**
     * @param options
     * @returns Promise that resolves to a void value and rejects to an error string
     * @since 1.8.0
     * @version 1.9.2 Added the option of using the Promise API instead of a callback
     */
    function downloadFile(url: string, destPath?: string, options?: DownloadOptions): Promise<void | string>;

    //#SECTION file system

    /**
     * 🔸 Offers a few functions to interface with the file system 🔸
     */
    namespace filesystem {
        interface LoggerOptions
        {
            [key: string]: boolean;

            /** Set to true to append content to the bottom of a file, false to just override the file's contents */
            append_bottom: boolean;
            /** Set to true to add a timestamp to the logged content */
            timestamp: boolean;
        }

        /**
         * 🔹 Logs a string to a specified log file 🔹
         * @param path Relative path to the log file
         * @param content Content that should be written to the log file
         * @param options Additional options
         * @throws Throws an error if the parameters are of the wrong type or not present
         * @since 1.5.0
         */
        function logger(path: string, content: string, options?: Partial<LoggerOptions>): void;

        /**
         * 🔹 Reads a folder asynchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
         * @param folder The folder that should be recursively read
         * @param callback The function that gets called after the folder has been read - has two arguments: error and result - you can also use the returned promise as a callback
         * @returns Returns a Promise - resolution gets passed the result, rejection gets passed an error message
         * @async
         * @since 1.7.0
         * @version 1.9.2 Now this function also supports the Promise API
         */
        function readdirRecursive(folder: string, callback?: (result: string[]) => void): Promise<string[]>;

        /**
         * 🔹 Reads a folder synchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback 🔹  
         *   
         * ❗ Warning! Large amounts of files (like letting it run on a directory like `C:\` or `/`) can freeze the process completely or exceed the maximum possible index of a JS array - instead use `readdirRecursive()` if possible
         * @param folder The folder that should be recursively read
         * @returns an array of strings containing absolute paths to all found files
         * @since 1.7.0
         * @version 1.8.0 Now the paths are being resolved as absolute, not relative + fixed JSDoc return type
         */
        function readdirRecursiveSync(folder: string): string[];

        /**
         * 🔹 This function checks if a file exists at the given path.  
         * (Reimplementation of the deprecated [`fs.exists()`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback) based on `fs.access()`) 🔹
         * @param path The path to the file - Gets passed through [`path.resolve()`](https://nodejs.org/api/path.html#path_path_resolve_paths)
         * @returns Returned Promise always resolves to a boolean (and never rejects) - true, if the file exists, false if not
         * @throws Throws a TypeError if the `path` argument is not a string or couldn't be resolved to a valid path
         * @since 1.13.0
         */
        function exists(path: string): Promise<boolean>;

        /**
         * 🔹 Ensures that a set of directories exist and creates them if not. 🔹
         * @param directories The directories to ensure the existance of
         * @async
         * @throws Throws a TypeError if the `directories` parameter is not an array of strings
         * @since 1.13.0
         */
        function ensureDirs(directories: string[]): Promise<void>;

        /**
         * 🔹 Synchronously ensures that a set of directories exist and creates them if not. 🔹  
         *   
         * ❗ Warning! Large amounts of directories can freeze the process completely or take a long time - use `ensureDirs()` instead if possible
         * @param directories The directories to ensure the existance of
         * @throws Throws a TypeError if the `directories` parameter is not an array of strings
         * @since 1.13.0
         */
        function ensureDirsSync(directories: string[]): void;
    }

    //#SECTION SQL

    /**
     * 🔸 Offers a few functions to interface with a SQL database 🔸
     */
    namespace sql {
        /**
         * 🔹 Sends a formatted (SQLI-protected) query 🔹
         * @param connection An SQL connection instantiated with [`mysql.createConnection()`](https://www.npmjs.com/package/mysql#establishing-connections)
         * @param query The SQL query with question marks where the inserted values should be
         * @param options The options of this query. [Here are the possible properties](https://www.npmjs.com/package/mysql#connection-options) - leave undefined to choose the default options
         * @param insertValues [Rest parameter] The values to be inserted into the question marks
         * @since 1.12.0
         */
        function sendQuery(connection: Connection, query: string, options?: QueryOptions, ...insertValues: any[]): Promise<object>;
    }

    //#SECTION System

    /**
     * 🔸 Offers few functions that refer to the system the process is executed on 🔸
     */
    namespace system {
        /**
         * 🔹 Returns the percentage of heap space that is used by the process 🔹
         * @returns Returns a floating point number between 0 and 100
         * @since 1.13.0
         */
        function usedHeap(): number;
        
        /**
         * 🔹 Executes a synchronous function or promise before the process gets shut down (on SIGINT or SIGTERM).  
         * This can be used to close files, abort connections or just to print a console message before shutdown. 🔹  
         *   
         * - ❗ If `scl.noShutdown()` was used, the passed function will be executed, but the process will not exit  
         * - ❗ Due to how the Promise API works, you will need to call this function again if the passed Promise is rejected
         * @param funct This function or Promise will get executed before process shutdown. Rejecting the Promise will prevent a shutdown.
         * @param code The exit code with which the process should be closed. Defaults to 0
         * @since 1.5.0
         * @version 1.8.0 Added "code" parameter to specify an exit code
         * @version 1.9.0 Function will now still be called when `scl.noShutdown()` was used
         * @version 1.9.4 Removed signal SIGKILL because it caused crashes on Linux
         * @version 1.13.0 Moved namespace
         * @version 1.14.0 Added support for the Promise API
         */
        function softShutdown(funct: (() => void | Promise<void>), code?: number): void;

        /**
         * 🔹 Prevents the script from shutting down with default commands (CTRL + C).
         * It has to either be killed with the task manager or internally, through the script (using `process.exit()`) 🔹
         * @since 1.5.0
         * @version 1.13.0 Moved namespace
         */
        function noShutdown(): void;
    
        /**
         * 🔹 Removes the script shut down prevention that was previously enabled with noShutdown() 🔹
         * (Sorry for the name, I saw an opportunity and I took it, don't judge me)
         * @since 1.6.0
         * @version 1.13.0 Moved namespace
         */
        function yesShutdown(): void;

        /**
         * 🔹 Checks if the process is currently running in the debugger environment.  
         * This can be useful because some features like child processes and reading from stdin do not work in certain debuggers. 🔹  
         * ❗ This function should support all major debuggers but this isn't guaranteed!  
         * If it doesn't detect your debugger, pass the command line argument `--debug` or `--inspect` ❗
         * @param {string} [checkArg] If provided, checks if this command line argument is present. Makes the function return `true` if it is.
         * @returns true, if the process is currently running in a debugger, false if not.
         * @since 1.9.0
         * @version 1.13.0 Moved namespace
         * @version 1.14.2 Added `inspector.url()` check for better results
         */
        function inDebugger(): boolean;

        /**
         * 🔹 Sets the terminal window's title. Supports both Windows and *nix. 🔹
         * @param title The string to set the window title to
         * @throws Throws a "TypeError" if the parameter `title` is not a string and couldn't be converted to one
         * @since 1.12.0
         * @version 1.13.0 Moved namespace
         */
        function setWindowTitle(title: string): void;
    }

    //#MARKER classes



    //#SECTION ProgressBar

    /**
     * 🔹 Creates a dynamic progress bar in the CLI 🔹  
     *   
     * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**  
     *   
     * Example:  
     * ![ProgressBar example image](https://sv443.net/cdn/jsl/doc/progress_bar_small.png)
     */
    class ProgressBar {
        /** The character to use for filled parts of the progress bar */
        public filledChar: string;
        /** The character to use for blank / empty parts of the progress bar */
        public blankChar: string;

        /**
         * 🔹 Creates a dynamic progress bar with a percentage and custom message display 🔹  
         *   
         * ![ProgressBar example image](https://sv443.net/cdn/jsl/doc/progress_bar_small.png)
         * @param timesToUpdate How many times you will call ProgressBar.next() in total - example: 4 means you will need to call ProgressBar.next() exactly four times to reach 100% progress 
         * @param initialMessage Initial message that appears at 0% progress - omit parameter to not have an initial message
         * @constructor
         * @since 1.7.0
         */
        constructor(timesToUpdate: number, initialMessage?: string);

        /**
         * 🔹 Increment the progress bar. The amount of these functions should be known at the point of initially creating the ProgressBar object. 🔹
         * @param message Message that should be displayed
         * @since 1.7.0
         */
        next(message?: string): void;
        
        /**
         * 🔹 Executes a function once the progress reaches 100% 🔹
         * @param {function} [callback] Function to be called when the progress bar reaches 100%
         * @returns {Promise} Promise that gets resolved when the progress bar reaches 100%
         * @throws Throws an error if the "callback" argument is not a function
         * @since 1.7.0
         * @version 1.12.0 Method now also returns a Promise
         */
        onFinish(callback: () => void): Promise<void>;
        
        /**
         * 🔹 Get the current progress as a float value (between `0.0` and `1.0`) 🔹
         * @since 1.7.0
         */
        getProgress(): number;
        
        /**
         * 🔹 Get the amount of increments that are still needed to reach 100% progress aka how many times the `next()` method still needs to be called 🔹
         * @returns {Number}
         * @since 1.7.0
         */
        getRemainingIncrements(): number;
    }

    //#SECTION MenuPrompt

    /** An option of a menu of the menu prompt */
    interface MenuPromptMenuOption
    {
        [key: string]: string;

        /** The key(s) that need(s) to be pressed to select this option */
        key: string;
        /** The description of this option */
        description: string;
    }

    /** A single menu of the menu prompt */
    interface MenuPromptMenu
    {
        [key: string]: string | MenuPromptMenuOption[];

        /** The title of this menu */
        title: string;
        /** An array of options for this menu */
        options: MenuPromptMenuOption[];
    }

    /** The result of a single menu of a menu prompt. This object is usually present inside an array. */
    interface MenuPromptResult
    {
        [key: string]: string | number;

        /** The key that had to be pressed to select this option */
        key: string;
        /** The description of the selected option */
        description: string;
        /** The title of the menu */
        menuTitle: string;
        /** The zero-based index of the selected option */
        optionIndex: number;
        /** The zero-based index of the menu */
        menuIndex: number;
    }

    /** A callback that gets executed once the MenuPrompt has finished */
    interface MenuPromptOnFinishedCallback
    {
        [key: string]: MenuPromptResult[];

        /** The results of the MenuPrompt (an array containing objects) - will be an empty array if there aren't any results */
        results: MenuPromptResult[];
    }

    /** The options of the menu prompt */
    interface MenuPromptOptions
    {
        [key: string]: string | boolean | MenuPromptOnFinishedCallback;

        /** The key or keys that need to be entered to exit the prompt */
        exitKey: string;
        /** The separator character(s) between the option key and the option description */
        optionSeparator: string;
        /** Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►" */
        cursorPrefix: string;
        /** Whether the menu should be retried if the user entered a wrong option - if false, continues to next menu */
        retryOnInvalid: boolean;
        /** A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys */
        onFinished: MenuPromptOnFinishedCallback;
        /** If set to true, the MenuPrompt will only accept a single character of input and will then automatically submit the value. If set to false, the user will have to explicitly press the Enter key to submit a value */
        autoSubmit: boolean;
    }

    /** Used for translating a menu prompt */
    interface MenuPromptLocalization
    {
        [key: string]: string;

        /** The text that's displayed when a wrong key was pressed */
        wrongOption: string;
        /** A different text that's displayed when a wrong key was pressed */
        invalidOptionSelected: string;
        /** The name of the exit option */
        exitOptionText: string;
    }

    /**
     * 🔹 Creates an interactive prompt in the CLI with one or more menus. 🔹  
     *   
     * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**  
     *   
     * Example:  
     * ![MenuPrompt example image](https://sv443.net/cdn/jsl/doc/menu_prompt_small.png)
     */
    class MenuPrompt {
        /** This is where all texts of the MenuPrompt are stored. Use this to translate or change them. */
        public localization: MenuPromptLocalization;

        /**
         * 🔹 Creates an interactive prompt with one or many menus - add them using `MenuPrompt.addMenu()`.  
         * To translate the messages, you can use the `MenuPrompt.localization` object, which is where all localization variables are stored. 🔹  
         * ❗ Warning: After creating a MenuPrompt object, the process will no longer exit automatically until the MenuPrompt has finished or was explicitly closed. You have to explicitly use process.exit() until the menu has finished or is closed  
         *   
         * ![MenuPrompt example image](https://sv443.net/cdn/jsl/doc/menu_prompt_small.png)
         * @param options The options for the prompt
         * @constructor
         * @since 1.8.0
         * @version 1.8.2 Removed second parameter - use `MenuPrompt.addMenu()` instead
         * @version 1.9.0 The construction of a MenuPrompt object will now set the process.stdin raw mode to true + There is now a `localization` property you can use to translate some messages
         */
        constructor(options?: Partial<MenuPromptOptions>);

        /**
         * 🔹 Opens the menu 🔹
         * ❗ Warning: While the menu is opened you shouldn't write anything to the console / to the stdout and stderr as this could mess up the layout of the menu and/or make stuff unreadable
         * @returns Returns true, if the menu could be opened or a string containing an error message, if not
         * @since 1.8.0
         */
        open(): boolean | string;
        
        /**
         * 🔹 Closes the menu prompt and returns the selected options up to this point 🔹
         * @returns Returns the results of the menu prompt as an array of objects
         * @since 1.8.0
         */
        close(): MenuPromptResult[];
        
        /**
         * 🔹 Adds a new menu to the menu prompt.  
         * You can even add new menus while the MenuPrompt is already open. 🔹
         * @param menu The menu to add to the menu prompt
         * @returns Returns true, if the menu could be added or a string containing an error message, if not
         * @since 1.8.0
         */
        addMenu(menu: MenuPromptMenu): boolean | string;
        
        /**
         * 🔹 Returns the (zero-based) index of the current menu of the menu prompt 🔹
         * @returns The zero-based index of the current menu or `-1` if the menu hasn't been opened yet
         * @since 1.8.0
         */
        currentMenu(): number;
        
        /**
         * 🔹 Returns the current results of the menu prompt.  
         * This does **not** close the menu prompt, unlike `close()` 🔹
         * @returns Returns the results of the menu prompt or null, if there aren't any results yet
         * @since 1.8.0
         */
        result(): MenuPromptResult[] | null;
        
        /**
         * 🔹 Checks a menu for valid syntax 🔹
         * @param menu The menu that should be validated
         * @returns Returns true if the menu is valid, a string array containing the error messages if not
         * @throws Throws an error if a falsy parameter or no parameter at all was passed
         */
        validateMenu(menu: MenuPromptMenu): boolean | string[];
    }

    //#SECTION FolderDaemon

    /** The options of the FolderDaemon */
    interface FolderDaemonOptions
    {
        [key: string]: string[] | undefined | boolean | number;

        /**
         * An array of [glob patterns.](https://en.wikipedia.org/wiki/Glob_(programming)) Only the matched files will be supervised by the FolderDaemon.  
         * Example: `['*.js']` will make the daemon only scan files that end in `.js`.  
         * ❗ You can only use *either* a whitelist *or* a blacklist, not both!
         */
        whitelist?: string[] | undefined;
        /**
         * An array of [glob patterns.](https://en.wikipedia.org/wiki/Glob_(programming)) The matched files will be ignored by the FolderDaemon.  
         * Example: `['*.js']` will block all .js files from being scanned by the daemon.  
         * ❗ You can only use *either* a blacklist *or* a whitelist, not both!
         */
        blacklist?: string[] | undefined;
        /** Whether to recursively scan through all subdirectories to supervise files. Defaults to `false` */
        recursive?: boolean;
        /** The interval in milliseconds at which to check if files have been changed. Defaults to 500. */
        updateInterval?: number;
    }

    /**
     * 🔹 Supervises a directory (and optionally its subdirectories) and executes a callback function if one or more of the files have changed. 🔹  
     *   
     * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**
     */
    class FolderDaemon {
        /**
         * 🔹 Constructs a new object of class FolderDaemon.  
         * The FolderDaemon supervises a directory and listens for changes in the files and then it executes a callback function that is registered with the method `onChanged()`. 🔹
         * @param dirPath The path to the directory you want the daemon to supervise
         * @param options Options of the FolderDaemon
         * 
         * @throws Throws an `InvalidPathError` if the path to the directory is invalid
         * @throws Throws a `NotAFolderError` if the path leads to a file instead of a directory
         * @throws Throws a `PatternInvalidError` if the whitelist or blacklist glob pattern is invalid
         * @throws Throws a `TypeError` if both the `whitelist` and `blacklist` properties are set in the `options` object
         * 
         * @since 1.10.0
         * @version 1.13.0 Condensed parameters into options object + added whitelist option
         */
        constructor(dirPath: string, options?: FolderDaemonOptions);

        /**
         * 🔹 Registers a callback function to be executed when the FolderDaemon detects one or more changed files 🔹  
         * ❗ Warning: If you use the Promise API, due to how it works fundamentally, you will only receive a single callback. If you want to receive more than one callback, either call this function again once the Promise has resolved for the first time or use the callback_fn parameter
         * @param callback_fn Callback function that contains two parameters: the first one, which is either a string or null and the second one which contains an array of strings, which are the absolute paths of the changed files
         * @returns Returns a promise that **only once** resolves to an array of strings, which are the absolute paths of the changed files or rejects to an error message.
         */
        onChanged(callback_fn: (error: null | string, changedFiles: string[]) => {}): Promise<string[]>;

        /**
         * 🔹 Removes the previously registered callback function(s) 🔹
         */
        removeCallbacks(): void;

        /**
         * 🔹 This is called on interval to check the folder but feel free to call it if you set the interval to `0` or if you want to manually check the folder at a precise time 🔹
         */
        intervalCall(): void;
    }

    //#SECTION SelectionMenu

    /**
     * An object of settings to be used in the constructor of the `SelectionMenu` class
     */
    interface SelectionMenuSettings
    {
        [key: string]: boolean | undefined;

        /** Whether or not the user can cancel the prompt with the Esc key */
        cancelable?: boolean;
        /** If the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side? */
        overflow?: boolean;
    }

    interface SelectionMenuResult {
        /** If this is `true`, the user has canceled the SelectionMenu by pressing the Escape key */
        canceled: boolean;

        /** An object containing the index and text of the selected option */
        option: {
            /** The zero-based index of the option the user has selected */
            index: number;
            /** The description / text of the option the user has selected */
            description: string;
        }
    }

    interface SelectionMenuLocale
    {
        [key: string]: string | undefined;

        /** Shorthand name of the escape key - defaults to "Esc" */
        escKey?: string;
        /** Cancel text - defaults to "Cancel" */
        cancel?: string;
        /** Scroll text - defaults to "Scroll" */
        scroll?: string;
        /** Shorthand name of the return key - defaults to "Return" */
        returnKey?: string;
        /** Select text - defaults to "Select" */
        select?: string;
    }

    /**
     * 🔹 Creates a menu in the Command Line Interface (CLI) with a list of options that can be scrolled through and selected. 🔹  
     *   
     * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**
     */
    class SelectionMenu {
        /**
         * Used to translate the SelectionMenu
         */
        public locale: SelectionMenuLocale;

        /**
         * 🔹 Constructs a new object of class SelectionMenu.  
         * The SelectionMenu is an interactive menu in the Command Line Interface with a list of options that can be scrolled through and selected. 🔹
         * @param title The title of the menu. Leave undefined to not have a title.
         * @param settings The settings of the menu. Leave undefined for the default settings to be applied.
         * @throws Throws a NoStdinError when the currently used terminal doesn't have a stdin stream or isn't a compatible TTY terminal.
         * @since 1.11.0
         */
        constructor(title?: string, settings?: Partial<SelectionMenuSettings>);

        /**
         * 🔹 Registers a function to be called when the user selected an option. 🔹
         * @param callback_fn 
         * @returns Returns a Promise that is resolved with the zero-based index number of the selected option
         * @since 1.11.0
         */
        onSubmit(callback_fn: (result: SelectionMenuResult) => any): Promise<SelectionMenuResult>;

        /**
         * 🔹 Sets the options that are available for a user to scroll through and select. 🔹
         * @param options An array of strings which are the options a user can scroll through and select
         * @returns Returns `true` if the method call was successful or returns a string containing an error message if not
         * @since 1.11.0
         */
        setOptions(options: string[]): string | boolean;

        /**
         * 🔹 Adds an option. 🔹
         * @param option
         * @returns Returns `true` if the method call was successful or returns a string containing an error message if not
         * @since 1.11.0
         */
        addOption(option: string): string | boolean;

        /**
         * 🔹 Opens the SelectionMenu. Make sure not to write anything to the console / stdout / stderr while the menu is open! 🔹
         * @return Returns `true` if the method call was successful or returns a string containing an error message if not
         * @since 1.11.0
         */
        open(): string | boolean;

        /**
         * 🔹 Closes the SelectionMenu. 🔹  
         * ❗ Using this method does **not** call the callback registered with `onSubmit()`
         * @return Returns `true` if the method call was successful or returns a string containing an error message if not
         * @since 1.11.0
         */
        close(): string | boolean;
    }

    //#SECTION StatePromise

    type PromiseState = "initialized" | "pending" | "fulfilled" | "rejected";

    /**
     * 🔹 This class is a wrapper for the Promise API.  
     * It keeps track of the state of the promise it wraps. 🔹  
     *   
     * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**
     */
    class StatePromise<T>
    {
        /**
         * 🔹 Constructs a new object of class StatePromise.  
         *   
         * This class is a wrapper for the Promise API.  
         * It keeps track of the state of the promise it wraps. 🔹
         * ❗ Make sure to call `exec()` to actually execute the passed promise and to retrieve the returned value(s)
         * @param promise The promise to wrap around and to extract the state from
         * @throws Throws a TypeError if the passed parameter is not an instance of the `Promise` class
         * @since 1.14.0
         */
        constructor(promise: Promise<T>);

        /**
         * 🔹 Actually executes the Promise. 🔹
         * @returns Returns a new Promise instance (not the one from the constructor) that does however inherit the returned values from the constructor promise
         * @since 1.14.0
         */
        exec(): Promise<T>;

        /**
         * 🔹 Returns the state of this Promise, as a string. 🔹  
         *   
         * The possible states are:  
         *   
         * | State | Description |
         * | :-- | :-- |
         * | `initialized` | The StatePromise instance was created but the `exec()` method wasn't called yet |
         * | `pending` | The promise execution was started but it hasn't been resolved or rejected yet |
         * | `fulfilled` | Execution was finished and the promise was resolved |
         * | `rejected` | Execution was finished but the promise was rejected |
         * @since 1.14.0
         */
        getState(): PromiseState;
    }

    /**
     * 🔸 Contains all of SCL's custom error classes 🔸
     */
    namespace Errors {
        /**
         * 🔹 Base class for all of SCL's error classes.  
         * Adds a `date` property that tracks the exact time an Error instance was created. 🔹
         */
        class SCLError extends Error
        {
            /** A Date instance set to the exact time this Error instance was created */
            date: Date;
        }

        /**
         * 🔹 This error gets thrown if an invalid path was provided 🔹
         * @since 1.12.0
         */
        class InvalidPathError extends SCLError {}

        /**
         * 🔹 This error gets thrown if the provided path is not a folder 🔹
         * @since 1.12.0
         */
        class NotAFolderError extends SCLError {}

        /**
         * 🔹 This error gets thrown if an invalid glob pattern was provided 🔹
         * @since 1.12.0
         */
        class PatternInvalidError extends SCLError {}

        /**
         * 🔹 This error gets thrown when the terminal that the process runs in doesn't provide an stdin channel 🔹
         * @since 1.12.0
         */
        class NoStdinError extends SCLError {}

        /**
         * 🔹 This error gets thrown when an invalid [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) was provided. 🔹
         * @since 1.12.0
         */
        class InvalidMimeTypeError extends SCLError {}

        /**
         * 🔹 This error gets thrown when a provided SQL connection was not established or errored out 🔹
         * @since 1.12.0
         */
        class SqlConnectionNotEstablishedError extends SCLError {}
    }

    //#MARKER objects



    //#SECTION info

    /**
     * 🔹 Info about SvCoreLib 🔹
     * @since 1.5.0
     * @version 1.8.0 added "contributors" array
     */
    namespace info
    {
        /** The current version */
        let version: string;
        /** The current version of SvCoreLib, but as an array of numbers for easier manipulation */
        let intVersion: number[];
        /** The name of SvCoreLib */
        let name: string;
        /** A short description of SvCoreLib */
        let desc: string;
        /** The name of the author of SvCoreLib */
        let author: string;
        /** People that contributed to SvCoreLib - this is the raw object from package.json */
        let contributors: object;
        /** The license of SvCoreLib */
        let license: string;
        /** The URL to SvCoreLib's documentation */
        let documentation: string;
    }

    //#SECTION colors

    /**
     * 🔹 Use this to add color to your console output 🔹
     * @since 1.8.0
     * @version 1.10.0 Added `rst` to the `fg` and `bg` objects
     */
    namespace colors
    {
        /** Resets the color to default */
        let rst: string;
        let fat: string;
        let blink: string;

        /** Sets the foreground (text) color */
        namespace fg {
            let black: string;
            let red: string;
            let green: string;
            let yellow: string;
            let blue: string;
            let magenta: string;
            let cyan: string;
            let white: string;
            /** Resets the color to default */
            let rst: string;
        }
        
        /** Sets the background/backdrop color */
        namespace bg {
            let black: string;
            let red: string;
            let green: string;
            let yellow: string;
            let blue: string;
            let magenta: string;
            let cyan: string;
            let white: string;
            /** Resets the color to default */
            let rst: string;
        }
    }
}
