#include "townlysettings.h"

/**
 * @brief This class saves and loads data to and from files
 */
TownlySettings::TownlySettings()
{
    if(m_settings == nullptr)
        m_settings = new QSettings(QSettings::Format::IniFormat, QSettings::Scope::UserScope, AUTHOR_NAME, APP_NAME);
}

TownlySettings::~TownlySettings()
{
    delete m_settings;
}

/**
 * @brief Resolves the provided value of the setting key enum to a QString
 * @param key The key of the setting
 */
QString TownlySettings::settingKeyToString(const SettingKey key)
{
    switch(key)
    {
        case Test: return "Test";

        default: return "INVALID_KEY";
    }
}

/**
 * @brief Resolves a value of the section enum to a QString
 * @param key Key of the setting
 */
QString TownlySettings::sectionToString(const Section key)
{
    switch(key)
    {
        case TestSection: return "TestSection";

        default: return "INVALID_SECTION";
    }
}

/**
 * @brief Sets the provided data to the provided section and key
 * @param sect Section of the setting
 * @param key Key of the setting
 * @param data Data / value of the setting
 */
void TownlySettings::setData(const Section sect, const SettingKey key, const QVariant data)
{
    QString section = sectionToString(sect);
    QString settKey = settingKeyToString(key);

    m_settings->beginGroup(section);
    m_settings->setValue(settKey, data);
    m_settings->endGroup();
}

/**
 * @brief Reads the data from the provided section and key. If no data was found, returns the vcruntime enum value NULL (0)
 * @param sect Section of the setting
 * @param key Key of the setting
 */
QVariant TownlySettings::getData(const Section sect, const SettingKey key)
{
    QString section = sectionToString(sect);
    QString settKey = settingKeyToString(key);

    m_settings->beginGroup(section);
    QVariant returnVal = m_settings->value(settKey, QVariant());
    m_settings->endGroup();

    return returnVal;
}
