import Prop from './Prop.js';
export default class Question extends Prop {
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
        ctx.fillStyle = this.color;
        ctx.rect(this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
        if (this.style === 'fill')
            ctx.fill();
        else if (this.style === 'stroke')
            ctx.stroke();
    }
}
//# sourceMappingURL=Question.js.map