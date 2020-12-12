#include "cell.h"

/**
 * @brief This constructor shouldn't be used. Default values: type=Land, position=0,0
 */
Cell::Cell()
{
    m_type = CellType::Land;
    m_position = QPoint(0, 0);
}

/**
 * @brief A single cell. Many of these make up a Grid
 * @param type The type of the cell
 * @param pos Position of this cell on its parent Grid
 */
Cell::Cell(const CellType type, const QPoint pos)
{
    m_type = type;
    m_position = pos;
}

/**
 * @brief Cell::getChar
 */
QChar Cell::getChar()
{
    return QChar('_');
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
