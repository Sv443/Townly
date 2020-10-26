# Dev/Classes
This document describes Townly's classes and what they are used for or can be used for.  
It is by no means a proper documentation yet but it can give you a general grasp of things.


<br><br><br>


# General-Purpose Classes

## Position
The Position class contains information about coordinates / a position on a [Grid.](#grid)

## LayeredNoise
This class is used to generate a map based on coherent noise algorithms and noise layering.


<br><br>


# In-Game Classes

## Grid
A grid is the outer-most bound of the game's area.  
It contains all [chunks](#chunk) and they in turn contain all [cells](#cell).

## Camera
The camera handles rendering out a part of a [grid](#grid) onto the command line interface.  
It also directly interfaces with the game's controls module, allowing the camera to be moved.

## Chunk
A chunk is of a set size and it contains a lot of [cells.](#cell)  
It is always contained inside a parent [Grid.](#grid)
This kind of sub-division is needed in voxel-based games to get performance to a playable level.  
A chunk is unloaded if it's outside the [camera's](#camera) viewport. This will mean that each of the chunk's [cells](#cell) are also unloaded.

## Cell
The base class of all cells.  
It only contains a small amount of information like its [position](#position) on a [grid](#grid) and how to render it to the command line interface.  
All of the other cell types inherit from this base class.

## Constructable
```Inheritance: Cell```  
A constructable is any [cell](#cell) or [multi cell structure](#multicellstructure) that can be built by the player.  
An example would be residential zoning or the town hall.

## InhabitedCell 
```Inheritance: Cell->Constructable```  
An inhabited cell is a [cell](#cell) that people can live in (though they don't necessarily *need* to).  
It also has a level, which increases after a certain amount of time, as long as the cell's needs are fulfilled.  
Certain types of inhabited cells like Residential or Commercial will have different needs.  

## SpecialBuilding 
```Inheritance: Cell->Constructable->InhabitedCell```  
Special buildings are [inhabited cells](#inhabitedcell) that have an influence radius, which can satisfy a need of residential cells.  
They also prompt the player if they really want to bulldoze it as to prevent unique or expensive buildings to be deleted.

## MultiCellPart 
```Inheritance: Cell->Constructable->InhabitedCell->SpecialBuilding```  
These are the single [cells](#cell) that make up a [MultiCellStructure.](#multicellstructure)  
Each of these cells has a reference to its parent [MultiCellStructure](#multicellstructure) object and can directly influence it and be influenced by it.  
Every MultiCellPart of a [MultiCellStructure](#multicellstructure) can have its own unique character which makes up a small part of the parent's "texture".

## MultiCellStructure
A MultiCellStructure contains multiple [MultiCellParts](#multicellpart) to make up a large object spanning multiple cells.  
This is used to make important buildings stand out more and increase their graphical level of detail.
