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

public slots:
    bool play(const Sound::Category cat, const Sound::Name name, const unsigned int volume = 100);
    void setPaused(const bool paused = true);
    void stop();
    void setMuted(const bool muted = true);
    void setVolume(unsigned int vol);

private:
    void initSounds();
    void registerSound(const Sound::Category cat, const Sound::Name name);

    QMediaPlayer *m_mediaPlayer = nullptr;

    QHash<Sound::Category, QHash<Sound::Name, Sound>> m_sounds;

protected:
    bool m_error = false;
    QString m_errorMsg = "";

    bool m_audioPlaying = false;

private slots:
    void positionChanged(qint64 pos);
    void errored(QMediaPlayer::Error err);

signals:
    void stateChanged(QMediaPlayer::State state);
};

#endif // AUDIOCONTROLLER_H
