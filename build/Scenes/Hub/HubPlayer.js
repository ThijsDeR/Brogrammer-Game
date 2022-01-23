import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import HubInfo from './Info/HubInfo.js';
export default class HubPlayer extends Player {
    goingThroughPlatform;
    constructor(xPos, yPos, width = undefined, height = undefined, userData) {
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
    }
    processInput() {
        this.xVel = 0;
        if (!this.airborne) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
                || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP))
                this.yVel = -(HubInfo.PLAYER_Y_SPEED) * (this.height / 100);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
            || this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN))
            this.goingThroughPlatform = true;
        else
            this.goingThroughPlatform = false;
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)
            || this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT))
            this.xVel = -(HubInfo.PLAYER_X_SPEED) * (this.width / 100);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)
            || this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT))
            this.xVel = HubInfo.PLAYER_X_SPEED * (this.width / 100);
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
            if (!(this.xPos + xVel < 0)) {
                this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
            }
            else {
                this.xVel = 0;
            }
        }
        else if (!(this.xPos + xVel + this.img.width > canvas.width)) {
            this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
        }
        else {
            this.xVel = 0;
        }
        const flying = () => {
            this.airborne = true;
            this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
            this.yVel += GameInfo.GRAVITY_CONSTANT
                * 2 * (elapsed * GameInfo.ELAPSED_PENALTY)
                * (this.height / 100);
        };
        let shouldBeFlying = true;
        if (this.yPos + this.yVel < 0) {
            this.airborne = true;
            this.yVel = Math.abs(this.yVel / 4);
            shouldBeFlying = false;
            if (this.yPos + this.yVel < 0)
                this.yPos = 0;
        }
        if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)
            || this.yPos + this.yVel + this.img.height > canvas.height) {
            this.airborne = false;
            this.yVel = 0;
            shouldBeFlying = false;
            if (this.yPos + this.yVel + this.img.height
                > canvas.height)
                this.yPos = canvas.height - this.img.height;
        }
        if (shouldBeFlying)
            flying();
    }
    isGoingThroughPlatform() {
        return this.goingThroughPlatform;
    }
}
