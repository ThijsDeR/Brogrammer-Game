import GameEngine from './GameEngine.js';
import MenuScene from './Scenes/Main-Menu/MenuScene.js';
export default class GameSceneHandler {
    game;
    engine;
    scene;
    constructor(game) {
        this.game = game;
        this.engine = new GameEngine(this, GameEngine.PLAY_CATCH_UP);
        this.scene = new MenuScene(this.game.getCanvas(), this.game.getUserData());
    }
    start() {
        this.engine.start();
    }
    processInput() {
        this.scene.processInput();
    }
    update(elapsed) {
        this.scene = this.scene.update(elapsed);
        return false;
    }
    render() {
        this.scene.draw();
    }
}
