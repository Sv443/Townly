TARGET = Townly


QT -= gui
QT += core network

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


SOURCES += \
        main.cpp \
        core/controller.cpp

TRANSLATIONS += \
    Townly_en_US.ts

RESOURCES += \
    resources.qrc

INCLUDEPATH += \
        core

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

HEADERS += \
    core/controller.h \
    info.h
