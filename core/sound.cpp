#include "sound.h"

Sound::Sound(const QUrl path)
{
    m_path = path;
}

Sound::Sound()
{
    m_path = QUrl();
}

/**
 * @brief Returns the sound's file path
 */
QUrl Sound::getPath()
{
    return m_path;
}

/**
 * @brief Resolves the category and name of a sound to a file path (QURL)
 * @param cat The category of the sound
 * @param name The name of the sound
 */
QUrl Sound::resolveSoundPath(const Category cat, const Name name)
{
    ResolvedSound resolved;

    QString pathPartCategory = resolveCategoryName(cat);
    QString pathPartName = resolveSoundName(name);

    QString fileExtension = "mp3"; // TODO: automate this


    QUrl retUrl;

    // FIXME: use paths from resources.qrc:
#if defined(Q_OS_MACX)
    retUrl = QUrl::fromLocalFile(QString("/Users/svenfehler/Code/Townly/resources/audio/%1/%2.%3").arg(pathPartCategory).arg(pathPartName).arg(fileExtension));
#elif defined(Q_OS_WIN)
    retUrl = QUrl::fromLocalFile(QString("F:/Code/Townly/resources/audio/%1/%2.%3").arg(pathPartCategory).arg(pathPartName).arg(fileExtension));
#endif

    qDebug() << "Sound has valid URL:" << retUrl.isValid();

    return retUrl;
}

QString Sound::resolveCategoryName(const Category cat)
{
    switch(cat)
    {
        case General: return "General";
        case Music:   return "Music";

        default: case __SoundCategoryLAST: return "InvalidCategory";
    }
}

QString Sound::resolveSoundName(const Name name)
{
    switch(name)
    {
        case DebugSound: return "DebugSound";

        case Olivier:               return "Olivier - Wintergatan Vol2";
        case Prototype:             return "Prototype - Wintergatan Vol2";
        case SandvikenStradivarius: return "Sandviken Stradivarius - Wintergatan Vol2";

        default: case __SoundNameLAST: return "InvalidSoundName";
    }
}
