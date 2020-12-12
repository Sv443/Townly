#include "devmenu.h"
#include "ui_devmenu.h"

DevMenu::DevMenu(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::DevMenu)
{
    ui->setupUi(this);

    // disable "?" button in the window title bar
    setWindowFlag(Qt::WindowContextHelpButtonHint, false);

    QString cellTypeLand("Land");
    QString cellTypeWater("Water");

    ui->cbSetCellType->addItem(cellTypeLand);
    ui->cbSetCellType->addItem(cellTypeWater);
}

DevMenu::~DevMenu()
{
    delete ui;
}
