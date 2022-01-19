import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import HubScene from '../../Hub/HubScene.js';
export default class SonNPCCutscene extends CutScene {
    sonNPC;
    textBox;
    constructor(canvas, userData, sonNPC) {
        super(canvas, userData);
        this.sonNPC = sonNPC;
        const sentences = [
            "Oh dankjewel, ik ben hier al zo lang",
            "ik moest zelfs die vieze slimes opeten, ewwww",
            "laten we nu maar teruggaan"
        ];
        this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.sonNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
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
            this.sonNPC.finishInteraction();
            this.textBox.reset();
            return true;
        }
        return false;
    }
    getOptionalScene() {
        return new HubScene(this.canvas, this.userData);
    }
}
