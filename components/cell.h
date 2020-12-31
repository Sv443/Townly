#ifndef CELL_H
#define CELL_H

#include <QPoint>
#include <QList>
#include <QString>
#include <QChar>


/**
 * @brief The type of a cell. The element named "__LAST" is not a cell type - it's merely used for iteration
 */
enum CellType {
    Land = 0,
    Water,
    Forest,

    __CellTypeLAST
};


/**
 * @brief Base class of all Cell derivatives
 */
class Cell
{
public:
    Cell();
    Cell(const CellType type, const QPoint pos);

    virtual void update();
    virtual bool bulldoze();
    virtual QChar getChar();

    static QString cellTypeToString(CellType type);
    static QList<CellType> getAllCellTypes();

private:
    CellType m_type = Land;
    QPoint m_position;
};

#endif // CELL_H
