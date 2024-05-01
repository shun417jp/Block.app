'use strict';
import { BlockGame } from "./blocks";

const game = new BlockGame("canvas");

document.addEventListener("keydown", (event)=>{
    game.setkeydownKey(event.key);
});

document.addEventListener("keyup", (event) => {
    game.setkeyupKey(event.key);
});