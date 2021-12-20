import CollideHandler from './CollideHandler.js';
import GameInfo from './GameInfo.js';
import KeyboardListener from './KeyboardListener.js';
import Prop from './Prop.js';
export default class Player extends Prop {
    xVel;
    yVel;
    keyboardListener;
    airBorne;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Dood.jpg', width, height);
        this.keyboardListener = new KeyboardListener();
        this.xVel = 0;
        this.yVel = 0;
        this.airBorne = false;
    }
    processInput() {
        this.xVel = 0;
        if (!this.airBorne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP))
                this.yVel = -(GameInfo.PLAYER_Y_SPEED);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT))
            this.xVel += -(GameInfo.PLAYER_X_SPEED);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT))
            this.xVel += GameInfo.PLAYER_X_SPEED;
    }
    move(canvas, contacts) {
        if (!(this.xPos + this.xVel < 0 || this.xPos + this.xVel + this.img.width > canvas.width)) {
            if (this.airBorne)
                this.xPos += this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY;
            else
                this.xPos += this.xVel;
        }
        else {
            this.xVel = 0;
        }
        const flying = () => {
            this.airBorne = true;
            this.yPos += this.yVel;
            this.yVel += GameInfo.GRAVITY_CONSTANT;
        };
        if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
            this.airBorne = true;
            this.yVel = Math.abs(this.yVel / 4);
        }
        else {
            flying();
        }
        if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.airBorne = false;
            this.yVel = 0;
        }
        else {
            flying();
        }
    }
}
//# sourceMappingURL=Player.js.map