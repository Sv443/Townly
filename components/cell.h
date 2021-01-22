#ifndef CELL_H
#define CELL_H

#include <QPoint>
#include <QList>
#include <QString>
#include <QChar>
#include <QDateTime>


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
    Cell(CellType type, QPoint pos);

    virtual void update();
    virtual bool bulldoze();
    virtual QChar getChar();

    CellType getType();
    qint64 getCreatedAt();

    static QString cellTypeToString(CellType type);
    static QList<CellType> getAllCellTypes();

private:
    CellType m_type = Land;
    QPoint m_position;
    qint64 m_createdAt;
};

#endif // CELL_H
