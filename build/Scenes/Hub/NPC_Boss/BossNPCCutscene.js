import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import BossInfo from '../../Boss-Fight/Info/BossInfo.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
import GameInfo from '../../../GameInfo.js';
export default class BossNPCCutscene extends CutScene {
    bossNPC;
    textBox;
    endTextBox;
    constructor(canvas, userData, bossNPC) {
        super(canvas, userData);
        this.bossNPC = bossNPC;
        const sentences = [
            "go boss"
        ];
        const endSentences = [
            "ga"
        ];
        const doneSentences = [
            "Oh, ben je hier alweer?",
            "Je bent al klaar met dit level, als je er nog eens doorheen wilt mag het van mij",
            "Succes!"
        ];
        if (this.userData.getNPCStoryProgress(BossInfo.BOSS_PROGRESS_OBJECT_NAME).finished)
            this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, doneSentences, GameInfo.IMG_PATH + 'chatbox.png');
        else if (this.userData.getNPCStoryProgress(BossInfo.BOSS_PROGRESS_OBJECT_NAME).talkedTo === true) {
            this.bossNPC.finishInteraction();
            this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences, GameInfo.IMG_PATH + 'chatbox.png');
        }
        else
            this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'chatbox.png');
        this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences, GameInfo.IMG_PATH + 'chatbox.png');
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.bossNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
        this.textBox.draw(this.ctx);
    }
    processInput() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_E)) {
            this.textBox.nextSentence();
        }
    }
    update(elapsed) {
        this.textBox.advanceSentence(elapsed);
        if (this.textBox.isDone()) {
            this.bossNPC.finishInteraction();
            const originalData = this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME);
            if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished) {
                this.userData.changeNPCStoryProgress({ name: PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME, talkedTo: true, finished: originalData.finished });
            }
            if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished) {
                this.textBox = this.endTextBox;
            }
            this.textBox.reset();
            return true;
        }
        return false;
    }
    getOptionalScene() {
        return null;
    }
}
