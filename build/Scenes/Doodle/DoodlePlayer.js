import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';
import DoodleInfo from './Info/DoodleInfo.js';
export default class DoodlePlayer extends Player {
    dead;
    userData;
    constructor(xPos, yPos, width = undefined, height = undefined, userData) {
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
        this.dead = false;
        this.userData = userData;
    }
    draw(ctx, offsetX, offsetY) {
        if (this.direction === 'left') {
            ctx.save();
            ctx.translate(this.xPos + this.width - offsetX, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, 0, this.yPos - offsetY, this.width, this.height);
            ctx.restore();
        }
        else if (this.direction === 'right') {
            ctx.drawImage(this.img, this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
        }
    }
    processInput() {
        this.xVel = 0;
        if (!this.airborne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
                || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP))
                this.yVel = -(DoodleInfo.PLAYER_Y_SPEED) * (this.height / 100);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)
            || this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT))
            this.xVel = -(DoodleInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)
            || this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT))
            this.xVel = DoodleInfo.PLAYER_X_SPEED * (this.width / 100);
        if (this.xVel < 0)
            this.direction = 'left';
        else if (this.xVel > 0)
            this.direction = 'right';
    }
    move(canvas, contacts, elapsed, onPlatform) {
        this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
        if (this.xPos < 0) {
            this.xPos = canvas.width - this.img.width;
        }
        else if (this.xPos + this.img.width > canvas.width) {
            this.xPos = 0;
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel * (elapsed * GameInfo.ELAPSED_PENALTY);
            this.yVel += DoodleInfo.GRAVITY_CONSTANT
                * (elapsed * GameInfo.ELAPSED_PENALTY)
                * (this.height / 100);
        };
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
            if (onPlatform) {
                this.airborne = false;
                this.yVel = 0;
            }
            else {
                this.airborne = true;
                this.yVel = -(DoodleInfo.PLAYER_Y_SPEED) * (this.height / 100);
                const jumpSound = new Audio(`${GameInfo.SOUND_PATH}JumpCloud.wav`);
                jumpSound.volume = DoodleInfo.CLOUD_JUMP_SOUND_VOLUME
                    * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                    * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
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
