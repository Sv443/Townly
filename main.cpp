#include <QCoreApplication>
#include <QDebug>

#include "info.h"
#include "controller.h"


int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);
    QCoreApplication::setApplicationName(APP_NAME);
    QCoreApplication::setApplicationVersion(APP_VERSION_STR);

    Controller ctrl(argc, argv);

    return a.exec();
}
