## Townly
### CLI city building game inspired by [TheoTown](https://store.steampowered.com/app/1084020/TheoTown/) and [Cities: Skylines](https://store.steampowered.com/app/255710/Cities_Skylines/)

<br>

I challenged myself multiple times to create games in the Command Line Interface.  
The goal was for me to be able to play the games on my server via SSH.  
This is my biggest challenge yet, a fully fledged city building game that runs in the command line.  
  
You can find my other CLI games [here.](https://github.com/Sv443/CLI-Games-Collection)  

<br>

### The story behind Townly:
#### Initial vanilla JS version:
Townly was first made in pure Node.js because I couldn't get my Qt Creator to work on my PC for a whole year.  
The legacy JS version's code can be found [here.](https://github.com/Sv443/Townly/tree/legacy/Townly.js)

<br>

#### C++ Rewrite:
After 2 months of work I started rewriting it in C++ (with Qt).  
The thought behind the rewrite was native compilation to executables, more stability and performance and lower-level access to the system.  
The legacy C++ version's code can be found [here.](https://github.com/Sv443/Townly/tree/legacy/Townly.cpp)

<br>

#### TypeScript Rewrite:
But then I quickly burnt out because C++ is fucking difficult (who would've thought).  
So after about another month of work, I decided to go with the best of both worlds and rewrote it again, but in TypeScript.  
It offers both the quick and easy coding of JavaScript *and* the type safety and extensive features of a language like C++.  
I also wanted to separate the game and the engine so that I can eventually reuse the engine or publish it separately.  
More info on the engine can be found [here.](./engine/README.md#readme)

<br><br>

### Some helpful resources:
- [Developer Notes](./dev/notes.txt)
- [Roadmap](./dev/roadmap.md)



<br><br><br><br>

<div align="center" style="text-align: center;">

Made by [Sv443](https://github.com/Sv443)  
[♥ Click here to support me ♥](https://github.com/sponsors/Sv443)

</div>
