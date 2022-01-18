import CollideHandler from '../../CollideHandler.js';
import TempleRunInfo from './Info/TempleRunInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import GameInfo from '../../GameInfo.js';
export default class TempleRunPlayer extends Player {
    dead;
    constructor(xPos, yPos, width = undefined, height = undefined, userData) {
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
        this.dead = false;
        this.xVel = (TempleRunInfo.PLAYER_X_SPEED) * (this.width / 100);
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
        this.yVel = 0;
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W))
            this.yVel = -(TempleRunInfo.PLAYER_Y_SPEED) * (this.height / 200);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S))
            this.yVel = TempleRunInfo.PLAYER_Y_SPEED * (this.height / 200);
    }
    move(canvas, contacts, elapsed) {
        this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
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
        this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
    }
    speed_up() {
        this.xVel += TempleRunInfo.PLAYER_SPEED_UP * (this.width / 100);
    }
    die() {
        this.dead = true;
    }
    isDead() {
        return this.dead;
    }
}
//# sourceMappingURL=TempleRunPlayer.js.map