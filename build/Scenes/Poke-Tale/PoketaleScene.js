import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import HubScene from '../Hub/HubScene.js';
import PokeTaleInfo from './Info/PokeTaleInfo.js';
import PokePlayer from './PokePlayer.js';
export default class PoketaleScene extends GameLevel {
    player;
    score;
    backgroundMusic;
    nextScene;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new PokePlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        this.score = 0;
        this.cutScene = null;
        this.nextScene = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'poketale_bg.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width * PokeTaleInfo.SCORE_TEXT_X_POS, this.canvas.height * PokeTaleInfo.SCORE_TEXT_Y_POS, this.canvas.height * PokeTaleInfo.SCORE_TEXT_FONT_SIZE, 'white');
        if (this.cutScene !== null) {
            this.cutScene.draw();
        }
    }
    processInput() {
        if (this.cutScene === null) {
            this.player.processInput();
        }
        else {
            this.cutScene.processInput();
        }
    }
    update(elapsed) {
        if (this.cutScene === null) {
            let contacts = [];
            this.player.move(this.canvas, contacts, elapsed);
            if (this.player.isDead())
                return new HubScene(this.canvas, this.userData);
            else if (this.score >= PokeTaleInfo.WIN_SCORE) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = PokeTaleInfo.WIN_SOUND_VOLUME;
                winSound.play();
                this.nextScene = new HubScene(this.canvas, this.userData);
            }
        }
        else {
            const cutsceneDone = this.cutScene.update(elapsed);
            if (cutsceneDone) {
                let optionalCutScene = this.cutScene.getOptionalScene();
                if (optionalCutScene)
                    this.nextScene = optionalCutScene;
                this.cutScene = null;
                this.backgroundMusic.play();
            }
        }
        if (this.nextScene !== this) {
            this.backgroundMusic.pause();
            this.backgroundMusic = null;
        }
        return this.nextScene;
    }
}
//# sourceMappingURL=PoketaleScene.js.map