#include "controller.h"

Controller::Controller(int argc, char *argv[])
{
#ifdef _DEBUG
    qDebug() << "Instantiating Controller";
#endif

    // set app base directory
    m_appDir = QDir(QCoreApplication::applicationDirPath());

    // parse command line arguments:
    parseArgs(argc, argv);
}

// this instance grants an access point to public variables on this class
Controller &Controller::instance()
{
    static Controller *instance = new Controller();
    return *instance;
}

// parses command line arguments, putting them into a QHash
void Controller::parseArgs(int argc, char *argv[])
{
    // set invocation name of app (first argument in argv)
    if(argc > 0)
        m_invocName.setFile(QString(argv[0]));

#ifdef _DEBUG
    qDebug() << "Listing arguments:";
#endif
    for(int i = 0; i < argc; i++)
    {
        QString arg(argv[i]);

        QStringList argParts = arg.split("=");
        QString key = argParts.first();
        QString val = argParts.last();

        if(QRegExp("^--.*").exactMatch(key)) // Format: --arg=xy
            key = key.mid(2);
        else if(QRegExp("^-.*").exactMatch(key)) // Format: -arg=xy
            key = key.mid(1);
        else
            continue;

    #ifdef _DEBUG
        qDebug() << "Arg:" << key << "-" << val;
    #endif

        m_cliArgs.insert(key, val);
    }
#ifdef _DEBUG
    qDebug() << "End list arguments";
#endif
}
