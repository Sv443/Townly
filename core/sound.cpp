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

    return QUrl(QString("F:/Code/Townly/resources/audio/%1/%2.%3").arg(pathPartCategory).arg(pathPartName).arg(fileExtension)); // FIXME: use sound files from resources.qrc
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
