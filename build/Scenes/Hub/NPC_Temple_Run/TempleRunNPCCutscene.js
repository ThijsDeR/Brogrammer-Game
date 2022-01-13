import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
export default class TempleRunNPCCutscene extends CutScene {
    doodleNPC;
    textBox;
    endTextBox;
    constructor(canvas, userData, doodleNPC) {
        super(canvas, userData);
        this.doodleNPC = doodleNPC;
        const sentences = [
            "Ey knul, leuk om je te ontmoeten",
            "Er komen nogal rare geluiden uit deze grot.",
            "Ik heb de ingang geblokkeerd, zodat er niks naar binnen of naar buiten kan.",
            "Zou je kunnen kijken of alles goed gaat daarbinnen?",
            "Aight Bedankt!"
        ];
        const endSentences = [
            "De ingang naar de grot is al open hoor!"
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
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.textBox.nextSentence();
        }
    }
    update(elapsed) {
        this.textBox.advanceSentence(elapsed);
        if (this.textBox.isDone()) {
            this.doodleNPC.finishInteraction();
            this.textBox = this.endTextBox;
            this.textBox.reset();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=TempleRunNPCCutscene.js.map