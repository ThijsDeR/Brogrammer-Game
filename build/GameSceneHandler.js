import GameEngine from './GameEngine.js';
import Scene from './Scene.js';
export default class GameSceneHandler {
    game;
    engine;
    scenes;
    currentScene;
    constructor(game) {
        this.game = game;
        this.engine = new GameEngine(this);
        this.scenes = [new Scene(this.game.getCanvas())];
        this.currentScene = 0;
    }
    start() {
        this.engine.start();
    }
    processInput() {
        this.scenes[this.currentScene].processInput();
    }
    update(elapsed) {
        this.scenes[this.currentScene].update();
        return false;
    }
    render() {
        this.scenes[this.currentScene].draw();
    }
}
//# sourceMappingURL=GameSceneHandler.js.map