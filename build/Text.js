export default class Text {
    xPos;
    yPos;
    text;
    fontSize;
    textAlign;
    textBaseline;
    color;
    constructor(text, xPos, yPos, fontSize = 20, textAlign = 'center', textBaseline = 'middle', color = 'black') {
        this.xPos = xPos;
        this.yPos = yPos;
        this.text = text;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
        this.color = color;
    }
    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.xPos, this.yPos);
    }
}
//# sourceMappingURL=Text.js.map