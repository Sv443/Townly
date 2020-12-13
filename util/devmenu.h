#ifndef DEVMENU_H
#define DEVMENU_H

#include <QDialog>
#include <QMessageBox>

#include "cell.h"

namespace Ui {
class DevMenu;
}

class DevMenu : public QDialog
{
    Q_OBJECT

public:
    explicit DevMenu(QWidget *parent = nullptr);
    ~DevMenu();

private slots:
    void on_pbSetCellType_clicked();

private:
    Ui::DevMenu *ui;
    void fillComboboxes();
    QString cellTypeString(CellType type);
};

#endif // DEVMENU_H
