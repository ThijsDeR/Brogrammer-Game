import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import DoodleInfo from './Info/DoodleInfo.js';
export default class DoodlePlayer extends Player {
    dead;
    constructor(xPos, yPos, width = undefined, height = undefined, userData) {
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
        this.dead = false;
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
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))
                this.yVel = -(DoodleInfo.PLAYER_Y_SPEED) * (this.height / 100);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A))
            this.xVel = -(DoodleInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D))
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
            this.yVel += DoodleInfo.GRAVITY_CONSTANT * (elapsed * GameInfo.ELAPSED_PENALTY) * (this.height / 100);
        };
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
            if (onPlatform) {
                this.airborne = false;
                this.yVel = 0;
            }
            else {
                this.airborne = true;
                this.yVel = -(DoodleInfo.PLAYER_Y_SPEED) * (this.height / 100);
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
