import Game from '../../Game.js';
import GameInfo from '../../GameInfo.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import HubScene from '../Hub/HubScene.js';
import PokeTaleInfo from './Info/PokeTaleInfo.js';
import PokePlayer from './PokePlayer.js';
import PokeEnemy from './PokeEnemy.js';
import CollideHandler from '../../CollideHandler.js';
import MenuCutScene from '../MenuCutScene.js';
export default class PoketaleScene extends GameLevel {
    player;
    props;
    score;
    backgroundMusic;
    nextScene;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new PokePlayer(this.canvas.width / 4, this.canvas.height / 1, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        this.props = [
            new PokeEnemy(Game.randomNumber(100, 1800), Game.randomNumber(450, 900), 100, 100),
            new PokeEnemy(Game.randomNumber(100, 1800), Game.randomNumber(450, 900), 100, 100),
            new PokeEnemy(Game.randomNumber(100, 1800), Game.randomNumber(450, 900), 100, 100),
            new PokeEnemy(Game.randomNumber(100, 1800), Game.randomNumber(450, 900), 100, 100),
        ];
        this.score = 0;
        this.cutScene = null;
        this.nextScene = this;
        this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'PokeTale_bg.wav');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.05;
        this.backgroundMusic.play();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'poketale_bg.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width * PokeTaleInfo.SCORE_TEXT_X_POS, this.canvas.height * PokeTaleInfo.SCORE_TEXT_Y_POS, this.canvas.height * PokeTaleInfo.SCORE_TEXT_FONT_SIZE, 'white');
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
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
            this.props.forEach((prop, propIndex) => {
                if (CollideHandler.collides(this.player, prop)) {
                    const contact = CollideHandler.getContactData(this.player, prop);
                    if (prop instanceof PokeEnemy) {
                        console.log("You hit me!");
                        this.props.splice(propIndex, 1);
                    }
                }
            });
            this.player.move(this.canvas, contacts, elapsed);
            if (this.player.isDead()) {
                return new HubScene(this.canvas, this.userData);
            }
            else if (this.score >= PokeTaleInfo.WIN_SCORE) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = PokeTaleInfo.WIN_SOUND_VOLUME;
                winSound.play();
                this.nextScene = new HubScene(this.canvas, this.userData);
            }
            if (this.player.isPausing()) {
                this.cutScene = new MenuCutScene(this.canvas, this.userData);
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
    ;
}
