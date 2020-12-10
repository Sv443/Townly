#ifndef CONTROLLER_H
#define CONTROLLER_H

#include <QObject>
#include <QDebug>
#include <QCommandLineParser>
#include <QHash>
#include <QFileInfo>
#include <QDir>

#include "info.h"


class Controller
        : public QObject
{
    Q_OBJECT

public:
    Controller(int argc = 0, char *argv[] = {});
    static Controller &instance();

private:
    void parseArgs(int argc, char *argv[]);
    QHash<QString, QString> m_cliArgs;
    QFileInfo m_invocName;
    QDir m_appDir;
};

#endif // CONTROLLER_H
