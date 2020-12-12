#ifndef GRID_H
#define GRID_H

#include <QExplicitlySharedDataPointer>
#include <QHash>
#include <QMap>
#include <QPoint>

#include "cell.h"



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
    QHash<int, QHash<int, Cell>> cells;
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
private:
    Cell cellAt(const QPoint pos);
    Size m_size;
};

#endif // GRID_H
