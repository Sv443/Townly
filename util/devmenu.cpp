#include "devmenu.h"
#include "ui_devmenu.h"

DevMenu::DevMenu(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::DevMenu)
{
    ui->setupUi(this);

    // disable "?" button in the window title bar, enable minimize button
    setWindowFlag(Qt::WindowType::WindowContextHelpButtonHint, false);
    setWindowFlag(Qt::WindowType::WindowMinimizeButtonHint, true);

    fillComboboxes();
}

DevMenu::~DevMenu()
{
    delete ui;
}

/**
 * @brief Fills the comboboxes with their values
 */
void DevMenu::fillComboboxes()
{
    // set cell type
    foreach(CellType ct, Cell::getAllCellTypes())
        ui->cbSetCellType->addItem(cellTypeString(ct));
}

QString DevMenu::cellTypeString(CellType type)
{
    return QString("%1 (%2)").arg(Cell::cellTypeToString(type)).arg(QString::number(type));
}

/**
 * @brief Set cell type button clicked
 */
void DevMenu::on_pbSetCellType_clicked()
{
    QList<CellType> allTypes = Cell::getAllCellTypes();
    int idx = ui->cbSetCellType->currentIndex();
    CellType selectedType = allTypes.at(idx);

    QMessageBox::information(this, "WIP", QString("Work In Progress!\nSelected type: %1").arg(cellTypeString(selectedType)));
}
