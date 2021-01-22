#ifndef GRID_H
#define GRID_H

#include <QExplicitlySharedDataPointer>
#include <QHash>
#include <QMap>
#include <QPoint>
#include <QDebug>

#include "cell.h"

#include <iostream>
#include "termcolor/termcolor.hpp"

#ifdef Q_OS_WIN
    #include <io.h>
    #include <fcntl.h>
    #include "windows.h"
#endif


// QPoint can't be used as a key for a QHash. This fixes it:
inline uint qHash(const QPoint &key) { return qHash(QPair<int,int>(key.x(), key.y())); } // https://stackoverflow.com/a/35408177/8602926


struct Size {
    unsigned int width;
    unsigned int height;
};


// ---------------- DATA ----------------
/**
 * @brief The actual data of a grid. This should be read and set on the GridInstance.
 */
class GridData
        : public QSharedData
{
public:
    QHash<QPoint, Cell> cells;
};



// ---------------- INSTANCE ----------------
/**
 * @brief Instance for reading and writing the shared data of the Grid
 */
class GridInstance
{
public:
    GridInstance() : m_data(new GridData()) { }

    static GridInstance & instance()
    {
        static GridInstance * instance = new GridInstance();
        return *instance;
    }

    QExplicitlySharedDataPointer<GridData> m_data;

};



// ---------------- CLASS ----------------
/**
 * @brief Two-dimensional Grid of Cells
 */
class Grid
{
public:
    Grid(const Size size);

    void devFill();
    void devDisplayGrid();

private:
    Cell cellAt(const QPoint pos);
    Size m_size;
};

#endif // GRID_H
