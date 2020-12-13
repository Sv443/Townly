#ifndef DEVMENU_H
#define DEVMENU_H

#include <QDialog>
#include <QMessageBox>

#include "cell.h"
#include "townlysettings.h"

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

    void on_pushButton_clicked();

private:
    TownlySettings *m_settings = nullptr;

    Ui::DevMenu *ui;
    void fillComboboxes();
    QString cellTypeString(CellType type);
    void reloadTestSettingDisp();
};

#endif // DEVMENU_H
