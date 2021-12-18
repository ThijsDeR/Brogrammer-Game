import Game from './Game.js';
export default class Prop {
    xPos;
    yPos;
    img;
    imgWidth;
    imgHeight;
    constructor(xPos, yPos, imgSrc, width = undefined, height = undefined) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.img = Game.loadNewImage(imgSrc, width, height);
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos, this.img.width, this.img.height);
    }
    getMinXPos() {
        return this.xPos;
    }
    getMaxXPos() {
        return this.xPos + this.img.width;
    }
    getMinYPos() {
        return this.yPos;
    }
    getMaxYPos() {
        return this.yPos + this.img.height;
    }
}
//# sourceMappingURL=Prop.js.map