import KeyboardListener from './KeyboardListener.js';
export default class CutScene {
    keyboardListener;
    canvas;
    ctx;
    userData;
    constructor(canvas, userData) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.userData = userData;
        this.keyboardListener = new KeyboardListener();
    }
}
