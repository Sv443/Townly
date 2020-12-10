#ifndef INFO_H
#define INFO_H

#include <QObject>

// ------ Macros: ------

#define TO_STR2(x) #x
#define TO_STR(x) TO_STR2(x)



// ------ App Info: ------

#define APP_NAME     "Townly"
#define AUTHOR_NAME  "Sv443"
#define APP_DESC     "CLI City Building game inspired by TheoTown and Cities:Skylines"



// ------ Version numbers: ------

#ifndef VER_MAJOR
    #define VER_MAJOR 0
#endif

#ifndef VER_MINOR
    #define VER_MINOR 1
#endif

#ifndef VER_PATCH
    #define VER_PATCH 0
#endif

#ifndef BUILDNBR
    #define BUILDNBR 1234
#endif

#define APP_VERSION      VER_MAJOR,VER_MINOR,VER_PATCH,GITLABCIPIPELINEID
#define APP_VERSION_STR  TO_STR(VER_MAJOR) "." TO_STR(VER_MINOR) "." TO_STR(VER_PATCH) "." TO_STR(GITLABCIPIPELINEID)



#endif // INFO_H
