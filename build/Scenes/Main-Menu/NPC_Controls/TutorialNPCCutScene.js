import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
export default class TutorialNPCCutscene extends CutScene {
    doodleNPC;
    textBox;
    endTextBox;
    constructor(canvas, userData, doodleNPC) {
        super(canvas, userData);
        this.doodleNPC = doodleNPC;
        const sentences = [
            "Hey welkom! Fijn dat je er bent, druk op spatie om verder te gaan.",
            "Goed zo, Jij bent er al klaar voor zie ik.",
            "Dan zit mijn taak er weer op.",
            "Heel veel succes!"
        ];
        const endSentences = [
            "Je mag gaan beginnen hoor...",
            "Start het spel en praat met de andere NPC'S om een level in te gaan"
        ];
        this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences);
        this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.doodleNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
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
            this.textBox = this.endTextBox;
            this.textBox.reset();
            return true;
        }
        return false;
    }
    getOptionalScene() {
        return null;
    }
}
