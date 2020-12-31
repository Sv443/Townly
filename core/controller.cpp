#include "controller.h"

Controller::Controller(int argc, char *argv[])
{
#ifdef _DEBUG
    qDebug() << "Instantiating Controller";
#endif

    // set app base directory
    m_appDir = QDir(QCoreApplication::applicationDirPath());

    // parse command line arguments
    parseArgs(argc, argv);

    // initialize the Townly settings module
    if(m_settings == nullptr)
        m_settings = new TownlySettings();

    // initialize input module
    Input::init();

    // initialize the audio controller
    if(m_audioCtrl == nullptr)
        m_audioCtrl = new AudioController();

    m_audioCtrl->play(Sound::Music, Sound::Olivier);

    // for testing
    inputLoop();
}

Controller::~Controller()
{
    // restore initial TTY session
    Input::close();
}

// this instance grants an access point to public variables on this class
Controller &Controller::instance()
{
    static Controller *instance = new Controller();
    return *instance;
}

// loop that captures the user's keyboard input
// will probably only be needed for testing
void Controller::inputLoop()
{
    bool exitCond = false;

    while(!exitCond)
    {
        Input::KeyPress kp = Input::getKey();

        Key key = Input::resolveAsciiCode(kp.val, kp.escVal);

        if(key == Key::ACTION_CTRL_C)
            openDevMenu();

        qInfo() << "Keypress:" << kp.val << kp.escVal << "- resolved enum:" << key;
    }
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

/**
 * @brief Opens the developer menu
 */
void Controller::openDevMenu()
{
    if(m_devMenu == nullptr)
        m_devMenu = new DevMenu();

    m_devMenu->setModal(false);
//    m_devMenu->setWindowFlag(Qt::WindowType::Tool, true);

    m_devMenu->exec();
}
