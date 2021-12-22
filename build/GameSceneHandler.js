import GameEngine from './GameEngine.js';
import MenuScene from './Main-Menu/MenuScene.js';
export default class GameSceneHandler {
    game;
    engine;
    scene;
    constructor(game) {
        this.game = game;
        this.engine = new GameEngine(this);
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
//# sourceMappingURL=GameSceneHandler.js.map