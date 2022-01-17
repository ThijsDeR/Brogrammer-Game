import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
export default class DoodleNPCCutscene extends CutScene {
    doodleNPC;
    textBox;
    endTextBox;
    constructor(canvas, userData, doodleNPC) {
        super(canvas, userData);
        this.doodleNPC = doodleNPC;
        const sentences = [
            "Hey, jij daar, die Robot!",
            "Ja jij! Zou jij mij kunnen helpen?",
            "Mijn zoon is ontvoerd tot aan de top van de wolken! ",
            "Zou jij helemaal naar boven kunnen gaan om hem te redden?",
            "Alvast bedankt!",
            "Achter me vind je een Portaal die je teleporteerd naar het laagste punt van de wolkentrap",
            "Ik zal het portaal open maken zodat je er makkelijk naartoe kan gaan.",
            "Op het onderste platform ben je veilig, totdat je begint met springen",
            "Dus pas op...",
            "Als je niet meer omhoog kan, spring dan naast het platform",
        ];
        const endSentences = [
            "Het portaal is al open, ga voort jonge robot."
        ];
        this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences);
        this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences);
        if (this.userData.getNPCStoryProgress('doodle').talkedTo === true)
            this.textBox = this.endTextBox;
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
    getOptionalScene() {
        return null;
    }
}
//# sourceMappingURL=DoodleNPCCutscene.js.map