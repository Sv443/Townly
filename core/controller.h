#ifndef CONTROLLER_H
#define CONTROLLER_H

#include <QObject>
#include <QDebug>
#include <QHash>
#include <QFileInfo>
#include <QDir>
//#include <QMessageBox>
#include <QCoreApplication>

#include "info.h"
//#include "util/devmenu.h"
#include "input.h"
#include "townlysettings.h"
#include "audiocontroller.h"
#include "outputhandler.h"

#include "grid.h"


class Controller
        : public QObject
{
    Q_OBJECT

public:
    Controller(int argc = 0, char *argv[] = {});
    ~Controller();

    static Controller &instance();
    void openDevMenu();

    TownlySettings *m_settings = nullptr;

private:
    void parseArgs(int argc, char *argv[]);
    void inputLoop();

    QHash<QString, QString> m_cliArgs;
    QFileInfo m_invocName;
    QDir m_appDir;

    Grid *m_grid = nullptr;
    OutputHandler *m_out = nullptr;

//    DevMenu *m_devMenu = nullptr;
    AudioController *m_audioCtrl = nullptr;

    void createGrid(int w, int h);
};

#endif // CONTROLLER_H
