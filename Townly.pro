TARGET = Townly


# QT -= gui
QT += core multimedia
# QT += widgets

CONFIG += c++11 console
CONFIG -= app_bundle

# Because of the amount and size of resources this is needed (otherwise the compiler crashes cause it has not enough heap space)
CONFIG += resources_big

# You can make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0


CONFIG(debug, debug|release) {
    macx {
            QMAKE_CXXFLAGS+="-fsanitize=address -g"
            QMAKE_LFLAGS+="-fsanitize=address"
    }

    # _DEBUG is defined if project is compiled in the debug profile.
    # Allows using "#ifdef _DEBUG" to only include code in debug mode.
    DEFINES += _DEBUG
}


TRANSLATIONS += \
    Townly_en_US.ts

RESOURCES += resources.qrc

win32:RC_ICONS = resources/Townly.ico
macx:ICON = resources/Townly.icns

INCLUDEPATH += \
        core \
        components

macx {
    LIBS += -lncurses
#    QMAKE_CXXFLAGS += -lncurses
#    QMAKE_CXXFLAGS_DEBUG += -lncurses
}

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

SOURCES += \
        components/cell.cpp \
        components/grid.cpp \
        core/audiocontroller.cpp \
        core/input.cpp \
    core/outputhandler.cpp \
        core/sound.cpp \
        core/townlysettings.cpp \
        main.cpp \
        core/controller.cpp \
#        util/devmenu.cpp

HEADERS += \
    components/cell.h \
    components/grid.h \
    core/audiocontroller.h \
    core/outputhandler.h \
    core/sound.h \
    core/townlysettings.h \
    info.h \
    core/controller.h \
    core/input.h \
#    util/devmenu.h



#SOURCES += \
#        lib/ansicolor/ansicolor-w32.c

#HEADERS += \
#        "lib/termcolor/include/termcolor/termcolor.hpp"

INCLUDEPATH += \
        "lib/termcolor/include" \


DISTFILES += \
    LICENSE.txt \
    README.md \
    dev/code_overview.md \
    dev/display.md \
    dev/notes.txt \
    dev/roadmap.md \

#FORMS += \
#    util/devmenu.ui
