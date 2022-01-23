import Prop from './Prop.js';
export default class RectProp extends Prop {
    color;
    style;
    constructor(xPos, yPos, width, height, color, style) {
        super(xPos, yPos, width, height);
        this.color = color;
        this.style = style;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width / 200 + this.height / 200;
        ctx.fillStyle = this.color;
        ctx.rect(this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
        if (this.style === 'fill')
            ctx.fill();
        else if (this.style === 'stroke')
            ctx.stroke();
    }
}
