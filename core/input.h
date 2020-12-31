#ifndef INPUT_H
#define INPUT_H

#include <QDebug>

#if defined(Q_OS_WIN)
    // Windows
    // https://en.wikipedia.org/wiki/Conio.h
    #include "conio.h"
#else
    // Unix
    // https://en.wikipedia.org/wiki/Ncurses
    #include "curses.h"
#endif


/**
 * @brief Enumeration that describes a key on a keyboard. Can also contain a key combination. The value "NOT_ASSIGNED" means the key wasn't mapped (yet).
 */
enum Key {
    NOT_ASSIGNED = 0,
    W, A, S, D,
    SPACE, RETURN, BACKSPACE, ESC, TAB, DEL,
    ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT,
    F1, F2, F3,
    ACTION_CTRL_C,


    __KeyLAST
};

class Input
{
public:
//    explicit Input();

    struct KeyPress {
        int val;
        int escVal;
    };

    static void init();
    static void close();

    static Key resolveAsciiCode(int val, int escVal = 0);
    static QString keyName(const Key key);
    static KeyPress getKey();

private:
    static int getChar();
};

#endif // INPUT_H
