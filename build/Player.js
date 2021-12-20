import CollideHandler from './CollideHandler.js';
import GameInfo from './GameInfo.js';
import KeyboardListener from './KeyboardListener.js';
import Prop from './Prop.js';
export default class Player extends Prop {
    xVel;
    yVel;
    keyboardListener;
    airborne;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Dood.jpg', width, height);
        this.keyboardListener = new KeyboardListener();
        this.xVel = 0;
        this.yVel = 0;
        this.airborne = false;
    }
    processInput() {
        this.xVel = 0;
        if (!this.airborne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP))
                this.yVel = -(GameInfo.PLAYER_Y_SPEED);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT))
            this.xVel += -(GameInfo.PLAYER_X_SPEED);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT))
            this.xVel += GameInfo.PLAYER_X_SPEED;
    }
    move(canvas, contacts) {
        let xVel;
        if (this.airborne)
            xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY;
        else
            xVel = this.xVel;
        if (xVel < 0) {
            if (!(this.xPos + xVel < 0 || contacts.includes(CollideHandler.RIGHT_CONTACT))) {
                this.xPos += xVel;
            }
            else {
                this.xVel = 0;
            }
        }
        else {
            if (!(this.xPos + xVel + this.img.width > canvas.width || contacts.includes(CollideHandler.LEFT_CONTACT))) {
                this.xPos += xVel;
            }
            else {
                this.xVel = 0;
            }
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel;
            this.yVel += GameInfo.GRAVITY_CONSTANT;
        };
        if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
            this.airborne = true;
            this.yVel = Math.abs(this.yVel / 4);
        }
        else {
            flying();
        }
        if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.airborne = false;
            this.yVel = 0;
        }
        else {
            flying();
        }
    }
}
//# sourceMappingURL=Player.js.map