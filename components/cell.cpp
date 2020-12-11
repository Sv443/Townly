#include "cell.h"

Cell::Cell(const CellType type, const QPoint pos)
{
    m_type = type;
    m_position = pos;
}

/**
 * @brief To be called on each game tick to update this cell
 */
void Cell::update()
{
    return; // base class shouldn't ever exist on its own so no update is needed
}

bool Cell::bulldoze()
{
    return false; // empty cells won't ever appear on the Grid (unless intentional) so they don't need to ever be bulldozed
}
