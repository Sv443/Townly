TARGET = Townly


# QT -= gui
QT += core multimedia
# QT += widgets

CONFIG += c++11 console
CONFIG -= app_bundle

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
        core/sound.cpp \
        core/townlysettings.cpp \
        main.cpp \
        core/controller.cpp \
#        util/devmenu.cpp

HEADERS += \
    components/cell.h \
    components/grid.h \
    core/audiocontroller.h \
    core/sound.h \
    core/townlysettings.h \
    info.h \
    core/controller.h \
    core/input.h \
#    util/devmenu.h

DISTFILES += \
    LICENSE.txt \
    README.md \
    dev/notes.txt

#FORMS += \
#    util/devmenu.ui
