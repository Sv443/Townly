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
QUrl Sound::resolveSoundPath(const SoundCategory cat, const SoundName name)
{
    ResolvedSound resolved;

    QString pathPartCategory = resolveCategoryName(cat);
    QString pathPartName = resolveSoundName(name);

    return QUrl(QString(":/resources/%1/%2.ogg").arg(pathPartCategory).arg(pathPartName));
}

QString Sound::resolveCategoryName(const SoundCategory cat)
{
    switch(cat)
    {
        case General: return "General";

        default: case __SoundCategoryLAST: return "InvalidCategory";
    }
}

QString Sound::resolveSoundName(const SoundName name)
{
    switch(name)
    {
        case Dbg: return "DebugSound";

        default: case __SoundNameLAST: return "InvalidSoundName";
    }
}
