import Game from '../Game.js';
import Prop from './Prop.js';
export default class ImageProp extends Prop {
    img;
    imgSrc;
    constructor(xPos, yPos, imgSrc, width = undefined, height = undefined) {
        super(xPos, yPos, width, height);
        this.img = Game.loadNewImage(imgSrc, width, height);
        this.imgSrc = imgSrc;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        ctx.drawImage(this.img, this.xPos - offsetX, this.yPos - offsetY, this.img.width, this.img.height);
    }
    getImage() {
        return this.img;
    }
    getImageSrc() {
        return this.imgSrc;
    }
}
//# sourceMappingURL=ImageProp.js.map