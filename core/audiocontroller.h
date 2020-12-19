#ifndef AUDIOCONTROLLER_H
#define AUDIOCONTROLLER_H

#include <QObject>
#include <QMediaPlayer>
#include <QDebug>
#include <QHash>
#include <QException>

#include "sound.h"


class AudioController
        : public QObject
{
    Q_OBJECT

public:
    AudioController();

    bool play(const Sound::SoundCategory cat, const Sound::SoundName name, const unsigned int volume = 100);
    void setPaused(const bool paused = true);
    void stop();
    void setMuted(const bool muted = true);

private:
    void initSounds();
    void registerSound(const Sound::SoundCategory cat, const Sound::SoundName name);

    QMediaPlayer *m_mediaPlayer = nullptr;

    QHash<Sound::SoundCategory, QHash<Sound::SoundName, Sound>> m_sounds;

protected:
    bool m_error = false;
    QString m_errorMsg = "";

    bool m_audioPlaying = false;

private slots:
    void positionChanged(qint64 pos);
    void errored(QMediaPlayer::Error err);
};

#endif // AUDIOCONTROLLER_H
