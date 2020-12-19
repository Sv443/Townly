#include "audiocontroller.h"


/**
 * @brief Controls all audio playback in Townly
 */
AudioController::AudioController()
{   
    QMultimedia::SupportEstimate est = QMediaPlayer::hasSupport("audio/ogg");

    if(est == QMultimedia::NotSupported)
    {
        m_error = true;
        m_errorMsg = "Playback of Ogg Vorbis (.ogg) files is not supported on your device. The Audio module will be disabled.";

        return;
    }

    if(m_mediaPlayer == nullptr)
    {
        m_mediaPlayer = new QMediaPlayer();

        connect(m_mediaPlayer, &QMediaPlayer::positionChanged, this, &AudioController::positionChanged, Qt::DirectConnection);
        connect(m_mediaPlayer, SIGNAL(error(QMediaPlayer::Error)), this, SLOT(errored(QMediaPlayer::Error)));
    }

    initSounds();
}

bool AudioController::play(const Sound::SoundCategory cat, const Sound::SoundName name, const unsigned int volume)
{
    int audioVol = volume;

    if(audioVol < 0)
        audioVol = 0;
    if(audioVol > 100)
        audioVol = 100;

    try
    {
        Sound sound = m_sounds.value(cat).value(name);

        qDebug() << "spath" << sound.getPath();

        QMediaContent mediaContent(sound.getPath());

        qDebug() << "mime" << mediaContent.canonicalResource().mimeType() << "- url" << mediaContent.canonicalUrl();

        m_mediaPlayer->setMedia(mediaContent);
        m_mediaPlayer->setVolume(audioVol);
        m_mediaPlayer->play(); // FIXME: DirectShowPlayerService::doSetUrlSource: Unresolved error code 0x80040216 (IDispatch error #22)

        qDebug() << "err:" << m_mediaPlayer->error();
        qDebug() << "errStr:" << m_mediaPlayer->errorString();

        m_audioPlaying = true;

        return true;
    }
    catch(QException e)
    {
        m_error = true;
        m_errorMsg = e.what();

        return false;
    }
}

/**
 * @brief Pauses or unpauses the audio
 */
void AudioController::setPaused(const bool paused)
{
    if(m_audioPlaying && paused)
    {
        m_mediaPlayer->pause();
        m_audioPlaying = false;
    }
    else if(!m_audioPlaying && !paused)
    {
        m_mediaPlayer->play();
        m_audioPlaying = true;
    }
}

/**
 * @brief Stops the audio
 */
void AudioController::stop()
{
    if(m_audioPlaying)
    {
        m_mediaPlayer->stop();
        m_audioPlaying = false;
    }
}

/**
 * @brief Mutes or unmutes the audio
 */
void AudioController::setMuted(const bool muted)
{
    if(!m_mediaPlayer->isMuted() && muted)
        m_mediaPlayer->setMuted(true);
    else if(m_mediaPlayer->isMuted() && !muted)
        m_mediaPlayer->setMuted(false);
}






/**
 * @brief Initializes all sounds
 */
void AudioController::initSounds()
{
    registerSound(Sound::SoundCategory::General, Sound::SoundName::DebugSound);
}

/**
 * @brief Registers a sound
 * @param cat The sound category
 * @param name The sound name
 */
void AudioController::registerSound(const Sound::SoundCategory cat, const Sound::SoundName name)
{
    QHash<Sound::SoundName, Sound> insHash;
    insHash.insert(name, Sound(Sound::resolveSoundPath(cat, name)));

    m_sounds.insert(cat, insHash);
}


/**
 * @brief https://doc.qt.io/qt-5/qmediaplayer.html#positionChanged
 */
void AudioController::positionChanged(qint64 pos)
{
    qDebug() << "AudioController changed position:" << pos;
}

/**
 * @brief https://doc.qt.io/qt-5/qmediaplayer.html#error-1
 */
void AudioController::errored(QMediaPlayer::Error err)
{
    qDebug() << "AudioController Error:" << err;
}
