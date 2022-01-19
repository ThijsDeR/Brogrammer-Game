import RectProp from "../../Props/RectProp.js";
import Game from "../../Game.js";
import BossInfo from "./Info/BossInfo.js";
import Scene from "../../Scene.js";
import GameInfo from "../../GameInfo.js";
export default class BossProjectile {
    rectProp;
    text;
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
        this.rectProp = new RectProp(xPos, yPos, width, height, 'green', 'fill');
        this.text = BossInfo.BOSS_TEXTS[Game.randomNumber(0, BossInfo.BOSS_TEXTS.length - 1)];
        this.xVelocity = xVelocity * 4;
        this.yVelocity = yVelocity * 4;
    }
    move(elapsed) {
        this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
        this.rectProp.setXPos(this.xPos);
        this.rectProp.setYPos(this.yPos);
    }
    draw(ctx) {
        this.rectProp.draw(ctx);
        Scene.writeTextToCanvas(ctx, this.text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), this.height / 5, 'white', 'center', 'middle', this.width);
    }
    checkOutOfCanvas(canvas) {
        if (this.xPos > canvas.width
            || this.xPos < 0 - this.width
            || this.yPos > canvas.height
            || this.yPos < 0 - this.height)
            return true;
        return false;
    }
    getRectProp() {
        return this.rectProp;
    }
}
