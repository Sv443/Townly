#include "devmenu.h"
#include "ui_devmenu.h"

DevMenu::DevMenu(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::DevMenu)
{
    ui->setupUi(this);

    // set up TownlySettings module
    if(m_settings == nullptr)
        m_settings = new TownlySettings();

    // disable "?" button in the window title bar, enable minimize button
    setWindowFlag(Qt::WindowType::WindowContextHelpButtonHint, false);
    setWindowFlag(Qt::WindowType::WindowMinimizeButtonHint, true);

    fillComboboxes();

    reloadTestSettingDisp();
}

DevMenu::~DevMenu()
{
    delete ui;
    delete m_settings;
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

/**
 * @brief Set TownlySettings "TestSection/Test" value
 */
void DevMenu::on_pushButton_clicked()
{
    QString val = ui->tbSetSettingTestVal->text();

    m_settings->setData(TownlySettings::Section::TestSection, TownlySettings::SettingKey::Test, val);

    reloadTestSettingDisp();
}

void DevMenu::reloadTestSettingDisp()
{
    QString txt = m_settings->getData(TownlySettings::TestSection, TownlySettings::Test).toString();
    ui->lbTestSettingDisp->setText(txt);
}
