import CollideHandler from '../CollideHandler.js';
import GameInfo from '../GameInfo.js';
import KeyboardListener from '../KeyboardListener.js';
import Player from '../Player.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
export default class DoodlePlayer extends Player {
    props;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Dood.jpg', width, height);
    }
    processInput() {
        this.xVel = 0;
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A))
            this.xVel += -(DoodleLevelInfo.PLAYER_X_SPEED);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D))
            this.xVel += DoodleLevelInfo.PLAYER_X_SPEED;
    }
    move(canvas, contacts, elapsed) {
        let xVel;
        if (this.airborne)
            xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY;
        else
            xVel = this.xVel;
        if (xVel < 0) {
            if (!(this.xPos + xVel < 0 || contacts.includes(CollideHandler.RIGHT_CONTACT))) {
                this.xPos += xVel * (elapsed / 10);
            }
            else {
                this.xVel = 0;
            }
        }
        else {
            if (!(this.xPos + xVel + this.img.width > canvas.width || contacts.includes(CollideHandler.LEFT_CONTACT))) {
                this.xPos += xVel * (elapsed / 10);
            }
            else {
                this.xVel = 0;
            }
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel * 2 * (elapsed / 10);
            this.yVel += DoodleLevelInfo.GRAVITY_CONSTANT * 2 * (elapsed / 10);
        };
        flying();
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.airborne = false;
            this.yVel = -3;
        }
        else {
            flying();
        }
    }
}
//# sourceMappingURL=DoodlePlayer.js.map