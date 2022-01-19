import GameInfo from "../../GameInfo.js";
import ImageProp from "../../Props/ImageProp.js";
export default class PlayerProjectile {
    image;
    xPos;
    yPos;
    width;
    height;
    xVelocity;
    yVelocity;
    constructor(xPos, yPos, width, height, xVelocity, yVelocity) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.image = new ImageProp(xPos, yPos, GameInfo.IMG_PATH + 'Temple-Run/block.png', width, height);
        this.xVelocity = xVelocity * 4;
        this.yVelocity = yVelocity * 4;
    }
    move(elapsed) {
        this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.image.setXPos(this.xPos);
        this.image.setYPos(this.yPos);
    }
    draw(ctx) {
        this.image.draw(ctx);
    }
    checkOutOfCanvas(canvas) {
        if (this.xPos > canvas.width
            || this.xPos < 0 - this.width
            || this.yPos > canvas.height
            || this.yPos < 0 - this.height)
            return true;
        return false;
    }
    getImage() {
        return this.image;
    }
}
