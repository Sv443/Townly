#ifndef CELL_H
#define CELL_H

#include <QPoint>


enum CellType {
    Land,
    Water
};


/**
 * @brief Base class of all Cell derivatives
 */
class Cell
{
public:
    Cell(const CellType type, const QPoint pos);

    virtual void update();
    virtual bool bulldoze();

private:
    CellType m_type = Land;
    QPoint m_position;
};

#endif // CELL_H
