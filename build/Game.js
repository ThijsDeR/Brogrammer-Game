import GameSceneHandler from './GameSceneHandler.js';
export default class Game {
    sceneHandler;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.sceneHandler = new GameSceneHandler(this);
    }
    start() {
        this.sceneHandler.start();
    }
    getCanvas() {
        return this.canvas;
    }
    static loadNewImage(src, width = undefined, height = undefined) {
        const img = new Image();
        img.src = src;
        if (width)
            img.width = width;
        if (height)
            img.height = height;
        return img;
    }
}
//# sourceMappingURL=Game.js.map