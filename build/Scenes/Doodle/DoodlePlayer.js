import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';
export default class DoodlePlayer extends Player {
    dead;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height);
        this.dead = false;
    }
    processInput() {
        this.xVel = 0;
        if (!this.airborne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))
                this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED) * (this.height / 100);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A))
            this.xVel = -(DoodleLevelInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D))
            this.xVel = DoodleLevelInfo.PLAYER_X_SPEED * (this.width / 100);
    }
    move(canvas, contacts, elapsed, onPlatform) {
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
            this.yVel += DoodleLevelInfo.GRAVITY_CONSTANT * (elapsed / 10) * (this.height / 100);
        };
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
            if (onPlatform) {
                this.airborne = false;
                this.yVel = 0;
            }
            else {
                this.airborne = true;
                this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED) * (this.height / 100);
                const jumpSound = new Audio(GameInfo.SOUND_PATH + 'JumpCloud.wav');
                jumpSound.volume = 0.3;
                jumpSound.play();
            }
        }
        else {
            flying();
        }
    }
    die() {
        this.dead = true;
    }
    isDead() {
        return this.dead;
    }
}
//# sourceMappingURL=DoodlePlayer.js.map