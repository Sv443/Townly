## Todo List:
- TODO: reimplement cursor for the new chunk-based cell containment system
- TODO: add option to use terminal's native cursor
- TODO: implement differential rendering (only re-render cells that have been changed)


<br><br>


## Current Goals:
- [x] Have a grid (no chunks) and have it be filled with empty cells (no map generation)
- [x] Display this grid
- [x] Implement a cursor that can be moved
- [x] Add chunks to the grid
- [x] Add serialization (save states)
- [x] Add some ambient music to the game
- [x] Add map generation (based on layered coherent noise) to the grid
- [x] Add a main menu (something basic to begin with)
- [x] Implement the legacy edition's smoothing algorithm based on cellular automata
- [x] Add an in-game currency system, contained in some kind of controller class
- [x] Add the legacy edition's components that are derived from the base cell class (Constructable, InhabitedCell, ...)
- [x] Add water and electricity (need generating buildings that currently generate an infinite amount), the units are distributed globally (don't need pipes and wires yet)
- [ ] Add "New Game" and "Continue" windows to create or choose and load a save state
- [ ] Register constructables at startup and make them be able to be built in-game, using up money in the process
- [ ] Add zone constructables (residential and commercial), which automatically construct buildings on themselves if basic needs are fulfilled
    - Buildings that are constructed on these zones should have a randomly assigned name (and maybe texture)
- [ ] Add the needs system, paving the way for the leveling-up-system
- [ ] Add the leveling-up-system, only allowing cells to upgrade when their needs are fulfilled
- [ ] Implement MultiCellStructures that consist of more than one cell, increasing size, importance and "texture" resolution
    - With the chunks system this might get complex and will definitely be a pain in the ass to implement correctly

(these goals might get changed later on)


<br><br>


### Districts / Zoning to add:
- Residential
- Commercial
- Industrial
- Agricultural
- Rural (Mix of Residential, Commercial and Agricultural but at a low efficiency)
- Historic District
