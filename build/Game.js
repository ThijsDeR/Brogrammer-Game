import GameSceneHandler from './GameSceneHandler.js';
import UserData from './UserData.js';
export default class Game {
    sceneHandler;
    canvas;
    userData;
    constructor(canvas) {
        this.canvas = canvas;
        this.userData = new UserData();
        this.sceneHandler = new GameSceneHandler(this);
    }
    getUserData() {
        return this.userData;
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
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
