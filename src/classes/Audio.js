const { resolve } = require("path");
const sound = require("sound-play");
const mm = require("music-metadata");

const { OSError } = require("../errors");


/** Adds this amount of seconds to the played audio file since the sound-play package is pretty inaccurate */
const endBuffer = 0.5;
/** @type {NodeJS.Platform[]} The currently supported platforms (OSes) */
const supportedPlatforms = ["win32", "darwin"];


class Audio
{
    /**
     * Creates an instance of the class Audio.  
     * Use this Class to play audio in the CLI.  
     *   
     * **Supported Platforms: Windows, MacOS**  
     *   
     * **Supported audio formats:**  
     * - Windows: `mp3, wav, flac, m4a`
     * - Mac: `to be tested`
     * @param {String} srcPath Path to the audio source file
     * @param {Boolean} [loop=false] Set to `true` to have Audio loop infinitely (warning: can't be stopped unless process exits)
     */
    constructor(srcPath, loop)
    {
        if(!supportedPlatforms.includes(process.platform))
            throw new OSError(`OS / platform "${process.platform}" is not supported by this application. Currently supported platforms are: ${supportedPlatforms.join(", ")}`);

        this.srcPath = resolve(srcPath);


        if(typeof loop != "boolean")
            loop = false;

        this.loop = loop;
    }

    /**
     * ❌ Private - don't use this method ❌
     * @param {mm.IAudioMetadata} meta instance of music-metadata's IAudioMetadata class
     * @param {String} srcPath path to audio source
     * @private
     */
    // Plays a sound
    _playSound(meta, srcPath)
    {
        return new Promise((pRes) => {
            const playSoundFile = (meta, srcPath) => {
                let songLength = parseFloat(meta.format.duration.toFixed(3));

                sound.play(srcPath);

                setTimeout(() => {
                    if(!this.loop)
                        return pRes();
                    else
                        playSoundFile(meta, srcPath);
                }, (songLength + endBuffer) * 1000);
            };

            playSoundFile(meta, srcPath);
        });
    }

    /**
     * Plays this audio - Warning: Audio can currently not be stopped!
     * @returns {Promise} Returns a promise that is resolved when the Audio has (approximately) finished playing
     */
    play()
    {
        return new Promise((pRes) => {
            mm.parseFile(this.srcPath, {
                duration: true
            }).then(meta => {
                this.meta = meta;

                this._playSound(this.meta, this.srcPath).then(() => {
                    return pRes();
                });
            });
        });
    }
}

module.exports = Audio;
