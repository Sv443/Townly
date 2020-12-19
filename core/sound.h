#ifndef SOUND_H
#define SOUND_H

#include <QObject>
#include <QMediaPlayer>
#include <QUrl>

/**
 * @brief Describes a single sound. Has to be passed to the AudioController in order for a sound to be played
 */
class Sound
{
public:
    /**
     * @brief The category of the sound
     */
    enum SoundCategory {
        General = 0,


        __SoundCategoryLAST
    };

    /**
     * @brief The name of the sound
     */
    enum SoundName {
        Dbg = 0,


        __SoundNameLAST
    };

    /**
     * @brief Contains information about the resolved sound
     */
    struct ResolvedSound {
        QUrl path;
        bool success;
        QString errorMsg;
    };



    Sound(const QUrl path);
    Sound();
    QUrl getPath();

    static QUrl resolveSoundPath(const SoundCategory cat, const SoundName name);
    static QString resolveCategoryName(const SoundCategory cat);
    static QString resolveSoundName(const SoundName name);

protected:
    QUrl m_path;
};

#endif // SOUND_H
