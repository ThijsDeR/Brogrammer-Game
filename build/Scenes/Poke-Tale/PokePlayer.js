import CollideHandler from "../../CollideHandler.js";
import PokeInfo from "./PokeInfo.js";
import KeyboardListener from "../../KeyboardListener.js";
import Player from "../../Player.js";
export default class PokePlayer extends Player {
    dead;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height);
        this.dead = false;
    }
    processInput() {
        this.yVel = 0;
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W))
            this.yVel = -(PokeInfo.PLAYER_Y_SPEED) * (this.height / 200);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S))
            this.yVel = PokeInfo.PLAYER_Y_SPEED * (this.height / 200);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A))
            this.xVel = -(PokeInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D))
            this.xVel = PokeInfo.PLAYER_X_SPEED * (this.width / 100);
    }
    move(canvas, contacts, elapsed) {
        this.xPos += this.xVel * (elapsed / 10);
        if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
            this.yVel = 0;
            if (this.yPos + this.yVel < 0)
                this.yPos = 0;
        }
        if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.yVel = 0;
            if (this.yPos + this.yVel + this.img.height > canvas.height)
                this.yPos = canvas.height - this.img.height;
        }
    }
    die() {
        this.dead = true;
    }
    isDead() {
        return this.dead;
    }
}
//# sourceMappingURL=PokePlayer.js.map