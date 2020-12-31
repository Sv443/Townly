# Overview over Townly's Code and Classes
**Important Note:** the game is not even in Alpha yet, so 99% of this will definitely change in the future.  

<br>

### Menu:
- **[Core](#core)**
    - [Controller](#controller)
    - [Input](#input)
        - [Key Enum](#key-enum)
        - [KeyPress Struct](#keypress-struct)
    - [TownlySettings](#townlysettings)
        - [Section](#section-enum)
        - [SettingKey](#settingkey-enum)
    - [AudioController](#audiocontroller)
    - [Sound](#sound)
        - [Category](#category-enum)
        - [Name](#name-enum)
        - [ResolvedSound](#resolvedsound-enum)
- **[Components](#components)**
    - [Cell](#cell)
        - [CellType Enum](#celltype-enum)
    - [Grid](#grid)
        - [GridInstance](#gridinstance)
        - [GridData](#griddata)

<br><br><br><br>

# Core:
The core "module" contains all vitally important classes.  
Yeah idk how to explain this any better, it's just a bunch of important shit.

<br><br>

## Controller
```apache
Inheritance: QObject
```
The Controller gets instantiated at the "Init" phase of startup.  
It is the central point of control and handles the execution of basically everything, including keyboard input, sound and more.

<br><br>

## Input
The Input class attaches to the console window (TTY) and reads keypresses from the user's keyboard.  
It offers a lot of convenience functions and enumerations that make usage (relatively) easy.  
It currently uses a very wonky implementation that will definitely change in the future.

### Key Enum
This is an enumeration that describes a key on a keyboard.  
It can also contain a key combination.  
The value "NOT_ASSIGNED" means the key wasn't mapped in the header file yet.  
For convenience, this enum's last item has the (invalid) name `__KeyLAST`. This makes iteration possible.

<br><br>

## KeyPress Struct
This struct contains information about a raw keypress.  
It has two ASCII keycode values as some key combinations send two separate control sequences to the TTY.  
This implementation is really wonky and sometimes the two values are swapped so using it is mostly trial and error.


<br><br>TODO:
- [TownlySettings](#townlysettings)
    - [Section](#section-enum)
    - [SettingKey](#settingkey-enum)
- [AudioController](#audiocontroller)
- [Sound](#sound)
    - [Category](#category-enum)
    - [Name](#name-enum)
    - [ResolvedSound](#resolvedsound-enum)


<br><br><br><br>

# Components:
Components are modules / classes that are used by Townly's [Core](#core).  
They *can* be optional, but some, like the [Grid](#grid) are required to exist (at least) once.

<br><br>

## Cell
Cells are what make up the buildings and landscape of Townly.  
They are of a certain type (Land, Water, Building ...) and have an x and y position on a [Grid](#grid).

### CellType Enum
This is an enumeration used to describe a [cell](#cell)'s type.  
For convenience, this enum's last item is an invalid cell type called `__CellTypeLAST`. This makes iteration possible.

<br><br>

## Grid
The Grid is a two-dimensional area filled with [Cells](#cell).  
It has a set size (unsigned), defined at its instantiation.

### GridInstance
This class is a static instance that is used to store [GridData](#griddata).  
As such, it can only exist one time and is automatically instantiated on the game's startup.  
Always use this class to read to and write from a [GridData](#griddata) object.

### GridData
```apache
Inheritance: QSharedData
```
This class contains a [Grid](#grid)'s [Cells](#cell).  
As it inherits from [QSharedData](https://doc.qt.io/qt-5/qshareddata.html), it is thread-safe.  
It can be accessed through the member variable `m_data` (which is an instance of [QExplicitlySharedDataPointer](https://doc.qt.io/qt-5/qexplicitlyshareddatapointer.html)) on the [GridInstance](#gridinstance).
