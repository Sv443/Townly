#include "input.h"


// **********
// **********
//
// TODO: If Dev Menu open, inputs aren't captured (maybe try putting the capturing in a QThread)
//
// **********
// **********


/**
 * @brief Waits for the user to press a key and returns its ASCII code(s)
 */
Input::KeyPress Input::getKey()
{
    KeyPress kp;

    kp.escVal = 0;
    kp.val = _getch(); // if a single keypress event with ASCII val 0 can be sent, this will break
    if(kp.val == 0 || kp.val == 224) // if the captured keypress is a combination of two keypresses, capture the next keypress as well
        kp.escVal = _getch();

    return kp;
}

// I hate myself for having to do this but I found no better alternative
// Feel free to mock me for this
/**
 * @brief Returns a Key enum value that's resolved from two passed ASCII codes (some keypresses send two codes for some reason)
 * @param val The (second, if two codes are sent,) value that's sent when a key is pressed
 * @param escVal The first value that's sent when a key is pressed (used when a keypress sends two codes) - defaults to 0
 */
Key Input::resolveAsciiCode(int val, int escVal)
{
    if(escVal == 0)
    {
        // --- NO ESCAPE CODE ---
        switch(val)
        {
            // letter keys (can have two values - one if shift is pressed, one if not)
            case 119: case 87:  return Key::W;
            case 97:  case 65:  return Key::A;
            case 115: case 83:  return Key::S;
            case 100: case 68:  return Key::D;

            // other keys
            case 32:  return Key::SPACE;
            case 13:  return Key::RETURN;
            case 8:   return Key::BACKSPACE;
            case 27:  return Key::ESC;
            case 9:   return Key::TAB;

            // key combinations
            case 4:   return Key::ACTION_CTRL_C;
        }
    }
    else
    {
        // --- ESCAPE CODE ---
        switch(val)
        {
            case 0:
            {
                switch(escVal)
                {
                    // F-keys
                    case 59:  return Key::F1;
                    case 60:  return Key::F2;
                    case 61:  return Key::F3;

                    // NUM pad arrow keys
                    case 72:  return Key::ARROW_UP;
                    case 77:  return Key::ARROW_RIGHT;
                    case 80:  return Key::ARROW_DOWN;
                    case 75:  return Key::ARROW_LEFT;
                }
            }

            // special shit
            case 224: // \033
            {
                switch(escVal)
                {
                    case 72:  return Key::ARROW_UP;
                    case 77:  return Key::ARROW_RIGHT;
                    case 80:  return Key::ARROW_DOWN;
                    case 75:  return Key::ARROW_LEFT;

                    case 83:  return Key::DEL;
                }
            }
        }
    }

    return Key::NOT_ASSIGNED;
}
