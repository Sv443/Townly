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

/*// https://www.lucidarme.me
// Include the ncurses library
#include "ncurses.h"


int main()
{
    // Initialize ncurses (read terminal configuration)
    initscr();
    // Initiliaze color mode and create a color pair
    start_color();
    init_pair(1, COLOR_WHITE, COLOR_BLUE);

    // Display colorized pair
    attron(COLOR_PAIR(1));
    printw("This should be printed in white with a blue background!\n");

    // Display uncolorized text
    attroff(COLOR_PAIR(1));
    printw ("Press a key to exit\n");

    // Update screen
    refresh();

    // Wait for a key before exiting
    getch();

    // Restore initial terminal configuration
    endwin();
}
*/
