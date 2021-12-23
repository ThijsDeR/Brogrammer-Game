import Game from '../Game.js';
import Prop from './Prop.js';
export default class ImageProp extends Prop {
    img;
    constructor(xPos, yPos, imgSrc, width = undefined, height = undefined) {
        super(xPos, yPos, width, height);
        this.img = Game.loadNewImage(imgSrc, width, height);
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        ctx.drawImage(this.img, this.xPos - offsetX, this.yPos - offsetY, this.img.width, this.img.height);
    }
}
//# sourceMappingURL=ImageProp.js.map