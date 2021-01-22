#include "cell.h"

/**
 * @brief This constructor shouldn't be used. Default values: type=Land, position=0,0
 */
Cell::Cell()
{
    Cell(CellType::Land, QPoint(0, 0));
}

/**
 * @brief A single cell. Many of these make up a Grid
 * @param type The type of the cell
 * @param pos Position of this cell on its parent Grid
 */
Cell::Cell(CellType type, QPoint pos)
{
    m_type = type;
    m_position = pos;
    m_createdAt = QDateTime::currentMSecsSinceEpoch();
}

/**
 * @brief Cell::getChar
 */
QChar Cell::getChar()
{
    return QChar('_');
}

CellType Cell::getType()
{
    return m_type;
}

qint64 Cell::getCreatedAt()
{
    return m_createdAt;
}

/**
 * @brief To be called on each game tick to update this cell
 */
void Cell::update()
{
    return; // base class shouldn't ever exist on its own so no update is needed
}

/**
 * @brief Checks if this cell can be bulldozed
 */
bool Cell::bulldoze()
{
    return false; // empty cells won't ever appear on the Grid (unless intentional) so they don't need to ever be bulldozed
}

/**
 * @brief Resolves a cell type to a string
 * @param type The cell type to resolve to a string
 */
QString Cell::cellTypeToString(CellType type)
{
    switch(type)
    {
        case Land:   return "Land";
        case Forest: return "Forest";
        case Water:  return "Water";

        default: case __CellTypeLAST: return "<Invalid Type>";
    }
}

/**
 * @brief Returns a QList of all cell types
 */
QList<CellType> Cell::getAllCellTypes()
{
    QList<CellType> l;

    for(int i = Land; i != __CellTypeLAST; i++)
    {
        l.append(static_cast<CellType>(i));
    }

    return l;
}
