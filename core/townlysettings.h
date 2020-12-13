#ifndef SERIALIZER_H
#define SERIALIZER_H


#include <QVariant>
#include <QSettings>

#include "info.h"


class TownlySettings
{
public:
    /**
     * @brief The Section of the settings
     */
    enum Section {
        TestSection,

        __SECTLAST
    };

    /**
     * @brief The key of the data to get saved/loaded to/from a file
     */
    enum SettingKey {
        Test,

        __KEYLAST
    };


    TownlySettings();
    ~TownlySettings();

    void setData(const Section sect, const SettingKey key, const QVariant data);
    QVariant getData(const Section sect, const SettingKey key);

    static QString sectionToString(const Section key);
    static QString settingKeyToString(const SettingKey key);

private:
    QSettings *m_settings = nullptr;
};

#endif // SERIALIZER_H
