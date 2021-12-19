import { Audio } from '../../Interfaces/Audio';
/**
 * Internal class representing a Web Audio AudioBufferSourceNode instance
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 */
export declare class WebAudioInstance implements Audio {
    private _src;
    private _volume;
    private _duration;
    private _playingPromise;
    private _playingResolve;
    private _loop;
    set loop(value: boolean);
    get loop(): boolean;
    set volume(value: number);
    get volume(): number;
    set duration(value: number | undefined);
    /**
     * Duration of the sound, in seconds.
     */
    get duration(): number | undefined;
    private get _playbackRate();
    private _isPlaying;
    private _isPaused;
    private _instance;
    private _audioContext;
    private _volumeNode;
    private _startTime;
    /**
     * Current playback offset (in seconds)
     */
    private _currentOffset;
    constructor(_src: AudioBuffer);
    isPlaying(): boolean;
    play(playStarted?: () => any): Promise<boolean>;
    pause(): void;
    stop(): void;
    private _startPlayBack;
    private _resumePlayBack;
    private _wireUpOnEnded;
    private _handleOnEnded;
    private _rememberStartTime;
    private _setPauseOffset;
    private _createNewBufferSource;
}
