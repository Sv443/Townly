#ifndef DEVMENU_H
#define DEVMENU_H

#include <QDialog>

namespace Ui {
class DevMenu;
}

class DevMenu : public QDialog
{
    Q_OBJECT

public:
    explicit DevMenu(QWidget *parent = nullptr);
    ~DevMenu();

private:
    Ui::DevMenu *ui;
};

#endif // DEVMENU_H
