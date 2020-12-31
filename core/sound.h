#ifndef SOUND_H
#define SOUND_H

#include <QObject>
#include <QMediaPlayer>
#include <QFile>
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
    enum Category {
        General = 0,
        Music,


        __SoundCategoryLAST
    };

    /**
     * @brief The name of the sound
     */
    enum Name {
        DebugSound = 0,
        Olivier,               // From Wintergatan Vol2
        Prototype,             // From Wintergatan Vol2
        SandvikenStradivarius, // From Wintergatan Vol2


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

    static QUrl resolveSoundPath(const Category cat, const Name name);
    static QString resolveCategoryName(const Category cat);
    static QString resolveSoundName(const Name name);

protected:
    QUrl m_path;
};

#endif // SOUND_H
