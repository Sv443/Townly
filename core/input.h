#ifndef INPUT_H
#define INPUT_H

#include <QCoreApplication>

// https://en.wikipedia.org/wiki/Conio.h
#include "conio.h"


enum Key {
    NOT_ASSIGNED,
    W, A, S, D,
    SPACE, RETURN, BACKSPACE, ESC, TAB, DEL,
    ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT,
    F1, F2, F3,
    ACTION_CTRL_C
};

class Input
{
public:
//    explicit Input();

     struct KeyPress {
         int val;
         int escVal;
     };

    static Key resolveAsciiCode(int val, int escVal = 0);
    static QString keyName(const Key key);
    static KeyPress getKey();

signals:
    void openDevMenu();
};

#endif // INPUT_H
