const Audio = require("./src/classes/Audio");


// m4a is the smallest file size of all supported formats so why not
let polishcow = new Audio("./resources/audio/polishcow.m4a", true);

polishcow.play();
