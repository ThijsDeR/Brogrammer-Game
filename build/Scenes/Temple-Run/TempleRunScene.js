import CollideHandler from "../../CollideHandler.js";
import Game from "../../Game.js";
import GameInfo from "../../GameInfo.js";
import GameLevel from "../../GameLevel.js";
import Platform from "../../Props/Platform.js";
import Scene from '../../Scene.js';
import HubScene from "../Hub/HubScene.js";
import MenuCutScene from "../MenuCutScene.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunInfo from "./TempleRunInfo.js";
import TempleRunPlayer from "./TempleRunPlayer.js";
import TRQuestion from "./TRQuestion.js";
export default class TempleRunScene extends GameLevel {
    player;
    question;
    score;
    backgroundMusic;
    nextScene;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.player = new TempleRunPlayer(this.canvas.width / 4, this.canvas.height / 2, this.canvas.width / 40, this.canvas.height / 10, this.userData);
        this.question = new TRQuestion(this.canvas, this.player);
        this.score = 0;
        this.cutScene = null;
        this.nextScene = this;
        this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'CaveBackgroundMusic.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.play();
    }
    newQuestion() {
        this.question = new TRQuestion(this.canvas, this.player);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage('./assets/img/cave_pixelart_background.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.question.draw(this.ctx, this.player.getMinXPos() - this.canvas.width / 10);
        this.player.draw(this.ctx, this.player.getMinXPos() - this.canvas.width / 10, 0);
        Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width / 2, this.canvas.width / 40, this.canvas.height / 50, 'white');
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
            this.question.getProps().forEach((prop) => {
                if (CollideHandler.collides(this.player, prop)) {
                    if (prop instanceof Platform) {
                        const contact = CollideHandler.getVerticalContactData(this.player, prop);
                        contacts.push(contact);
                        if (contact === CollideHandler.TOP_CONTACT) {
                            this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                        }
                        else if (contact === CollideHandler.BOTTOM_CONTACT) {
                            this.player.setYPos(prop.getMaxYPos());
                        }
                    }
                    else if (prop instanceof DeadProp) {
                        this.player.die();
                        const wrongSound = new Audio(GameInfo.SOUND_PATH + 'Wrong.mp3');
                        wrongSound.volume = 0.8;
                        wrongSound.play();
                    }
                    else if (prop instanceof CorrectProp) {
                        this.userData.increaseCoins(10);
                        this.score += 1;
                        const correctSound = new Audio(GameInfo.SOUND_PATH + 'Correct.wav');
                        correctSound.volume = 0.6;
                        correctSound.play();
                        this.newQuestion();
                    }
                }
            });
            this.player.speed_up();
            this.player.move(this.canvas, contacts, elapsed);
            if (this.player.isDead())
                return new HubScene(this.canvas, this.userData);
            else if (this.score >= TempleRunInfo.WIN_SCORE) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = 0.6;
                winSound.play();
                this.userData.changeNPCStoryProgress({ name: 'templerun', talkedTo: true, finished: true });
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
}
//# sourceMappingURL=TempleRunScene.js.map