import RectProp from './RectProp.js';
export default class Button extends RectProp {
    text;
    fontSize;
    constructor(xPos, yPos, width, height, color, text, fontSize) {
        super(xPos, yPos, width, height, color);
        this.text = text;
        this.fontSize = fontSize;
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = 'black';
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const metrics = ctx.measureText(this.text);
        let xPos = this.xPos + (this.width / 2);
        let yPos = this.yPos + (this.height / 2);
        ctx.fillText(this.text, xPos, yPos);
    }
}
//# sourceMappingURL=Button.js.map