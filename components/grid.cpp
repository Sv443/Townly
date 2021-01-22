#include "grid.h"

Grid::Grid(const Size size)
{
    m_size = size;
}

/**
 * @brief Dev method - fills the entire Grid with Cells of alternating type
 */
void Grid::devFill()
{
    int cellTypeIdx = 0;

    for(uint x = 0; x < m_size.height; x++)
    {
        for(uint y = 0; y < m_size.width; y++)
        {
            if(cellTypeIdx == CellType::__CellTypeLAST)
                cellTypeIdx = 0;

            Cell c(static_cast<CellType>(cellTypeIdx), QPoint(x, y));

            cellTypeIdx++;

            GridInstance::instance().m_data->cells.insert(QPoint(x, y), c);
        }
    }
}

void Grid::devDisplayGrid()
{
    QDebug dbg = qDebug();
    dbg.noquote();

    dbg << "total cell count:" << GridInstance::instance().m_data->cells.count() << endl << endl;

    for(uint x = 0; x < m_size.height; x++)
    {
        for(uint y = 0; y < m_size.width; y++)
        {
            QPoint cellPos(x, y);
            Cell c = cellAt(cellPos);

            switch(c.getType())
            {
                case CellType::Forest: std::cout << termcolor::green; break;
                case CellType::Land:   std::cout << termcolor::cyan;  break;
                case CellType::Water:  std::cout << termcolor::blue;  break;

                default: break;
            }

        #ifdef Q_OS_WIN
            fflush(stdout);
            _setmode(_fileno(stdout), _O_U16TEXT);
        #endif

            std::wcout << L"\u2588";
        }

    #ifdef Q_OS_WIN
        fflush(stdout);
        _setmode(_fileno(stdout), _O_TEXT);
    #endif

        std::cout << termcolor::reset;
        std::cout << std::endl;
    }

    dbg << endl << "done" << endl;
}

/**
 * @brief Returns the cell at the specified coordinates
 * @param pos Position / Coordinates of the cell
 */
Cell Grid::cellAt(const QPoint pos)
{
    return GridInstance::instance().m_data->cells.value(pos);
//    return Cell(CellType::Land, pos);
}
