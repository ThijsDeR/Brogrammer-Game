import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import HubScene from '../Hub/HubScene.js';
import BossInfo from './Info/BossInfo.js';
import BossPlayer from './BossPlayer.js';
export default class BossScene extends GameLevel {
    player;
    score;
    backgroundMusic;
    nextScene;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new BossPlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        this.score = 0;
        this.cutScene = null;
        this.nextScene = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'poketale_bg.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
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
                this.nextScene = new HubScene(this.canvas, this.userData);
            else if (this.score >= BossInfo.WIN_SCORE) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = BossInfo.WIN_SOUND_VOLUME;
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
