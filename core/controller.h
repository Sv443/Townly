#ifndef CONTROLLER_H
#define CONTROLLER_H

#include <QObject>
#include <QDebug>
#include <QHash>
#include <QFileInfo>
#include <QDir>
#include <QMessageBox>

#include "info.h"
#include "input.h"
#include "util/devmenu.h"


class Controller
        : public QObject
{
    Q_OBJECT

public:
    Controller(int argc = 0, char *argv[] = {});
    static Controller &instance();
    void openDevMenu();

private:
    void parseArgs(int argc, char *argv[]);
    void inputLoop();

    QHash<QString, QString> m_cliArgs;
    QFileInfo m_invocName;
    QDir m_appDir;

    DevMenu *m_devMenu = nullptr;
};

#endif // CONTROLLER_H
