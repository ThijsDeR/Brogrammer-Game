import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
export default class Projectile extends ImageProp {
    xVelocity;
    yVelocity;
    constructor(xPos, yPos, width, height, imageSrc, xVelocity, yVelocity) {
        super(xPos, yPos, imageSrc, width, height);
        this.xVelocity = xVelocity * 4;
        this.yVelocity = yVelocity * 4;
    }
    move(elapsed) {
        this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.setXPos(this.xPos);
        this.setYPos(this.yPos);
    }
    checkOutOfCanvas(canvas) {
        if (this.xPos > canvas.width
            || this.xPos < 0 - this.width
            || this.yPos > canvas.height
            || this.yPos < 0 - this.height)
            return true;
        return false;
    }
}
