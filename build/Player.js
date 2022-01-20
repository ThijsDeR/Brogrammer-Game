import CollideHandler from './CollideHandler.js';
import GameInfo from './GameInfo.js';
import ImageProp from './Props/ImageProp.js';
import KeyboardListener from './KeyboardListener.js';
export default class Player extends ImageProp {
    xVel;
    yVel;
    keyboardListener;
    airborne;
    direction;
    constructor(xPos, yPos, imageSrc, width = undefined, height = undefined) {
        super(xPos, yPos, imageSrc, width, height);
        this.keyboardListener = new KeyboardListener();
        this.xVel = 0;
        this.yVel = 0;
        this.airborne = false;
        this.direction = 'right';
    }
    draw(ctx, offsetX, offsetY) {
        if (this.direction === 'left') {
            ctx.save();
            ctx.translate(this.xPos + this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, 0, this.yPos, this.width, this.height);
            ctx.restore();
        }
        else if (this.direction === 'right') {
            ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
        }
    }
    processInput() {
        this.xVel = 0;
        if (!this.airborne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP))
                this.yVel = -(GameInfo.PLAYER_Y_SPEED) * (this.height / 100);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A) || this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT))
            this.xVel = -(GameInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D) || this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT))
            this.xVel = GameInfo.PLAYER_X_SPEED * (this.width / 100);
        if (this.xVel < 0)
            this.direction = 'left';
        else if (this.xVel > 0)
            this.direction = 'right';
    }
    move(canvas, contacts, elapsed, onPlatform) {
        let xVel;
        if (this.airborne)
            xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY;
        else
            xVel = this.xVel;
        if (xVel < 0) {
            if (!(this.xPos + xVel < 0 || contacts.includes(CollideHandler.RIGHT_CONTACT))) {
                this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
            }
            else {
                this.xVel = 0;
            }
        }
        else {
            if (!(this.xPos + xVel + this.img.width > canvas.width || contacts.includes(CollideHandler.LEFT_CONTACT))) {
                this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
            }
            else {
                this.xVel = 0;
            }
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
            this.yVel += GameInfo.GRAVITY_CONSTANT * 2 * (elapsed * GameInfo.ELAPSED_PENALTY) * (this.height / 100);
        };
        let shouldBeFlying = true;
        if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
            this.airborne = true;
            this.yVel = Math.abs(this.yVel / 4);
            shouldBeFlying = false;
            if (this.yPos + this.yVel < 0)
                this.yPos = 0;
        }
        if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.airborne = false;
            this.yVel = 0;
            shouldBeFlying = false;
            if (this.yPos + this.yVel + this.img.height > canvas.height)
                this.yPos = canvas.height - this.img.height;
        }
        if (shouldBeFlying)
            flying();
    }
    isInteracting() {
        return this.keyboardListener.isKeyDown(KeyboardListener.KEY_E);
    }
    isPausing() {
        return this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC);
    }
}
