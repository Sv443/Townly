## Townly
### CLI city building game inspired by [TheoTown](https://store.steampowered.com/app/1084020/TheoTown/) and [Cities: Skylines](https://store.steampowered.com/app/255710/Cities_Skylines/)
Powered by [Teng](https://github.com/Sv443/Teng#readme)

<br>

### If you have questions or wanna chat, feel free to [join my Discord server](https://dc.sv443.net/)

<br><br>

## Download:
If you want to download and play this game, please check out the [#builds](https://discord.com/channels/826865418298851400/828746225242865694) channel on the [Townly Discord server.](https://dc.sv443.net/townly)

<br><br>

## Why?
Good question. Let me just make up some totally legitimate reasons, hold on...  
  
I challenged myself multiple times to create games in the Command Line Interface.  
The goal was for me to be able to play the games on my server via SSH.  
This is my biggest challenge yet, a fully fledged city building game that runs in the command line.  
  
You can find my other CLI games [here.](https://github.com/Sv443/CLI-Games-Collection)  

<br><br>

## The story behind Townly:
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
Two months later I quickly burnt out because C++ is fucking difficult (who would've thought).  
So after about a month of pause, I decided to go with the best of both worlds and rewrote it again, but in TypeScript.  
It offers both the quick and easy coding of JavaScript *and* the type safety and extensive features of a language like C++.  
I also wanted to separate the game and the engine so that I can eventually reuse the engine or publish it separately.  
More info on the engine can be found [here.](https://github.com/Sv443/Teng#readme)

<br><br>

### Some helpful resources:
- [Current development progression / developer notes](./dev/notes.md)
- ["Convenience features" roadmap](./dev/roadmap.md)
- [Nice to know chart about how Townly displays stuff](./dev/display.md)


<br><br><br><br>

## Build Instructions:
If you can't find a compatible version of Townly, you can follow this guide to build Townly:  

First, make sure you have Git, Node.js, npm and TypeScript set up and working, then:  
1. Clone the repository
2. Pull the Teng submodule by running `git submodule init` and then `git submodule update`
3. Install dependencies by running `npm i`
4. Run the command `npm start` to compile and run the code
- To create an executable, use the command `npm run compile-pkg`


<br><br><br><br>


<div align="center" style="text-align: center;">

Made by [Sv443](https://github.com/Sv443) with [Teng](https://github.com/Sv443/Teng)  
[♥ Click here to support me ♥](https://github.com/sponsors/Sv443)

</div>
