#include "outputhandler.h"

OutputHandler::OutputHandler()
{
#ifdef Q_OS_WIN
    m_hStdout = new HANDLE(GetStdHandle(STD_OUTPUT_HANDLE));
#endif
}

OutputHandler::~OutputHandler()
{
    if(m_hStdout != nullptr)
        delete m_hStdout;
}

void OutputHandler::write(const QString text)
{

}

void OutputHandler::write(const QChar ch)
{

}

void OutputHandler::writeLine(const QString line)
{

}

void OutputHandler::setFgColor(const Color col)
{
#ifdef Q_OS_WIN
    SetConsoleTextAttribute(m_hStdout, FOREGROUND_RED);
#else

#endif
}

void OutputHandler::setBgColor(const Color col)
{

}
