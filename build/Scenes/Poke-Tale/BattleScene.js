import CutScene from "../../CutScene.js";
import KeyboardListener from "../../KeyboardListener.js";
import TextBox from "../../Props/TextBox.js";
import GameInfo from '../../GameInfo.js';
import Game from "../../Game.js";
export default class BattleScene extends CutScene {
    player;
    enemy;
    textBox;
    constructor(canvas, userData, player, enemy) {
        super(canvas, userData);
        const sentences = [
            "test"
        ];
        this.player = player;
        this.enemy = enemy;
        this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences, GameInfo.IMG_PATH + 'PokeBox.png');
    }
    draw() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'Battle-ground.png'), 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.player.getImage(), 150, 480, this.canvas.width / 4, this.canvas.height / 4);
        this.ctx.drawImage(this.enemy.getImage(), 1150, 360, this.canvas.width / 4, this.canvas.height / 4);
        this.textBox.draw(this.ctx);
    }
    processInput() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.textBox.nextSentence();
        }
    }
    update(elapsed) {
        if (this.textBox.isDone()) {
            this.textBox.reset();
            return true;
        }
        return false;
    }
    getOptionalScene() {
        return null;
    }
}
