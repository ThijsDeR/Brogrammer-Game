import Prop from './Prop.js';
export default class RectProp extends Prop {
    color;
    constructor(xPos, yPos, width, height, color) {
        super(xPos, yPos, width, height);
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.stroke();
    }
}
//# sourceMappingURL=RectProp.js.map