import Game from './Game.js';

console.log(document.querySelector('canvas#canvas'));
const game = new Game(document.querySelector('canvas#canvas'));
game.start();
