import CutScene from "../../CutScene.js";
import GameInfo from "../../GameInfo.js";
import KeyboardListener from "../../KeyboardListener.js";
import TextBox from "../../Props/TextBox.js";
import HubScene from "../Hub/HubScene.js";
export default class BossFightEndCutscene extends CutScene {
    textBox;
    bossImage;
    constructor(canvas, userData, bossImage) {
        super(canvas, userData);
        this.bossImage = bossImage;
        const sentences = [
            "Wow, je hebt me verslagen",
            "Ik wou nog zoveel chaos veroorzaken, maar dat kan nu niet meer",
            "Ik dacht dat ik meer in huis had, maar blijkbaar niet",
            "Gefeliciteerd met je overwinning",
            "Ik ga er weer vandoor",
        ];
        this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'chatbox.png');
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.bossImage, 0, 0, this.canvas.width / 4, this.canvas.height);
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
            this.textBox.reset();
            return true;
        }
        return false;
    }
    getOptionalScene() {
        return new HubScene(this.canvas, this.userData);
    }
}
