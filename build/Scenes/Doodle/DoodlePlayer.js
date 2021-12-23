import CollideHandler from '../../CollideHandler.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
export default class DoodlePlayer extends Player {
    dead;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Sam_Suong/robot-idle.gif', width, height);
        this.dead = false;
    }
    processInput() {
        this.xVel = 0;
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A))
            this.xVel += -(DoodleLevelInfo.PLAYER_X_SPEED);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D))
            this.xVel += DoodleLevelInfo.PLAYER_X_SPEED;
    }
    move(canvas, contacts, elapsed) {
        this.xPos += this.xVel * (elapsed / 10);
        if (this.xPos < 0) {
            this.xPos = canvas.width - this.img.width;
        }
        else if (this.xPos + this.img.width > canvas.width) {
            this.xPos = 0;
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel * (elapsed / 10);
            this.yVel += DoodleLevelInfo.GRAVITY_CONSTANT * (elapsed / 10);
        };
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
            this.airborne = false;
            this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED);
        }
        else {
            flying();
        }
        if (this.yPos + this.yVel + this.img.height > canvas.height) {
            this.dead = true;
        }
    }
    setDeath(state) {
        this.dead = state;
    }
    isDead() {
        return this.dead;
    }
}
//# sourceMappingURL=DoodlePlayer.js.map