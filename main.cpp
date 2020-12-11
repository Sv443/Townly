#include <QApplication>
#include <QDebug>
#include <csignal>
#include <csetjmp>

#include "info.h"
#include "controller.h"


bool system_supports_GUI = true;


int main(int argc, char *argv[])
{
    QCoreApplication *a;

    if(system_supports_GUI)
        a = new QApplication(argc, argv);
    else
        a = new QCoreApplication(argc, argv);

    QCoreApplication::setApplicationName(APP_NAME);
    QCoreApplication::setApplicationVersion(APP_VERSION_STR);

    Controller ctrl(argc, argv);

    return a->exec();
}
