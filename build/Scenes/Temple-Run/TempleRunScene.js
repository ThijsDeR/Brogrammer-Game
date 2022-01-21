import CollideHandler from "../../CollideHandler.js";
import Game from "../../Game.js";
import GameInfo from "../../GameInfo.js";
import GameLevel from "../../GameLevel.js";
import Platform from "../../Props/Platform.js";
import Scene from '../../Scene.js';
import UserData from "../../UserData.js";
import HubScene from "../Hub/HubScene.js";
import MenuCutScene from "../MenuCutScene.js";
import CorrectProp from "./CorrectProp.js";
import DeadProp from "./DeadProp.js";
import TempleRunInfo from "./Info/TempleRunInfo.js";
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
        this.player = new TempleRunPlayer(this.canvas.width / 4, this.canvas.height / 2, this.canvas.width * TempleRunInfo.PLAYER_WIDTH, this.canvas.height * TempleRunInfo.PLAYER_HEIGHT, this.userData);
        this.question = new TRQuestion(this.canvas, this.player);
        this.score = 0;
        this.cutScene = null;
        this.nextScene = this;
        this.backgroundMusic = new Audio(GameInfo.SOUND_PATH + 'CaveBackgroundMusic.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = (TempleRunInfo.BACKGROUND_MUSIC_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100));
        this.backgroundMusic.play();
    }
    newQuestion() {
        this.question = new TRQuestion(this.canvas, this.player);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'cave_pixelart_background.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.question.draw(this.ctx, this.player.getMinXPos() - this.canvas.width * TempleRunInfo.PLAYER_X_OFFSET);
        this.player.draw(this.ctx, this.player.getMinXPos() - this.canvas.width * TempleRunInfo.PLAYER_X_OFFSET, 0);
        Scene.writeTextToCanvas(this.ctx, `Score: ${this.score}`, this.canvas.width * TempleRunInfo.SCORE_TEXT_X_POS, this.canvas.height * TempleRunInfo.SCORE_TEXT_Y_POS, this.canvas.height / 50, 'white');
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
                        wrongSound.volume = TempleRunInfo.WRONG_SOUND_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                        wrongSound.play();
                    }
                    else if (prop instanceof CorrectProp) {
                        this.userData.increaseCoins(TempleRunInfo.WIN_COIN_AMOUNT);
                        this.score += 1;
                        const correctSound = new Audio(GameInfo.SOUND_PATH + 'Correct.wav');
                        correctSound.volume = TempleRunInfo.CORRECT_SOUND_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                        ;
                        correctSound.play();
                        this.newQuestion();
                    }
                }
            });
            this.player.speed_up();
            this.player.move(this.canvas, contacts, elapsed);
            if (this.player.isDead())
                this.nextScene = new HubScene(this.canvas, this.userData);
            else if (this.score >= TempleRunInfo.WIN_SCORE) {
                const winSound = new Audio(GameInfo.SOUND_PATH + 'Win.mp3');
                winSound.volume = TempleRunInfo.WIN_SOUND_VOLUME * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100) * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
                winSound.play();
                this.userData.changeNPCStoryProgress({ name: TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME, talkedTo: true, finished: true });
                this.userData.increaseCoins(TempleRunInfo.COMPLETE_SCORE_AWARD);
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
