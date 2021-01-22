#pragma once

#include <QObject>
#include <QString>
#include <QDebug>

#ifdef Q_OS_WIN
    #include "windows.h"
#endif

enum Color {
    Red,
    Blue,
    Green,

    __Color_LAST
};

class OutputHandler
        : public QObject
{
    Q_OBJECT
public:
    OutputHandler();
    ~OutputHandler();

    void write(const QString text);
    void write(const QChar ch);
    void writeLine(const QString line);
    void setFgColor(const Color col);
    void setBgColor(const Color col);

private:
#ifdef Q_OS_WIN
    HANDLE *m_hStdout;
#endif
};
