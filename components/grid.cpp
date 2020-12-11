#include "grid.h"

Grid::Grid(const Size size)
{
    m_size = size;
}

/**
 * @brief Dev method - fills the entire Grid with Cells
 */
void Grid::devFill()
{
    for(uint x = 0; x < m_size.height; x++)
    {
        for(uint y = 0; y < m_size.width; y++)
        {
            Cell c(CellType::Land, QPoint(x, y));

            GridInstance::instance().m_data->cells.insert(QPoint(x, y), c);
        }
    }
}

/**
 * @brief Returns the cell at the specified coordinates
 * @param pos Position / Coordinates of the cell
 */
Cell Grid::cellAt(const QPoint pos)
{
//    return GridInstance::instance().m_data->cells.value(pos);
    return Cell(CellType::Land, pos);
}
