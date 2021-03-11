## Current Goals:
- [x] Have a grid (no chunks) and have it be filled with empty cells (no map generation)
- [ ] Display this grid
- [ ] Implement a cursor that can be moved
- [ ] Add chunks to the grid
- [ ] Add some ambient music to the game
- [ ] Add map generation (based on layered coherent noise) to the grid
- [ ] Add a main menu (something basic to begin with)
- [ ] Implement the legacy edition's smoothing algorithm based on cellular automata
- [ ] Add an in-game currency system, contained in some kind of controller class
- [ ] Create an extendable GUI around a game view (game view contains the grid)
- [ ] Add the legacy edition's components that are derived from the base cell class (Constructable, InhabitedCell, ...)
- [ ] Add water and electricity (need generating buildings), they are distributed globally (don't need pipes and wires yet)
- [ ] Register constructables at startup and make them be able to be built in-game, using up money in the process
- [ ] Add zone constructables (residential and commercial), which automatically construct buildings on themselves if basic needs are fulfilled
- [ ] - Buildings that are constructed on these zones should have a randomly assigned name (and maybe texture)
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
