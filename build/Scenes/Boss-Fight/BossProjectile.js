import Game from "../../Game.js";
import BossInfo from "./Info/BossInfo.js";
import GameInfo from "../../GameInfo.js";
import ImageProp from "../../Props/ImageProp.js";
export default class BossProjectile {
    imageProp;
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
        this.imageProp = new ImageProp(xPos, yPos, BossInfo.PROJECTILE_IMAGE_SRC[Game.randomNumber(0, BossInfo.PROJECTILE_IMAGE_SRC.length - 1)], width, height);
        this.xVelocity = xVelocity * 4;
        this.yVelocity = yVelocity * 4;
    }
    move(elapsed) {
        this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.imageProp.setXPos(this.xPos);
        this.imageProp.setYPos(this.yPos);
    }
    draw(ctx) {
        this.imageProp.draw(ctx);
    }
    checkOutOfCanvas(canvas) {
        if (this.xPos > canvas.width
            || this.xPos < 0 - this.width
            || this.yPos > canvas.height
            || this.yPos < 0 - this.height)
            return true;
        return false;
    }
    getImageProp() {
        return this.imageProp;
    }
}
