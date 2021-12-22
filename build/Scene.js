export default class Scene {
    canvas;
    ctx;
    userData;
    constructor(canvas, userData) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.userData = userData;
    }
    static writeTextToCanvas(ctx, text, xPos, yPos, fontSize = 20, textAlign = 'center', textBaseline = 'middle', color = 'black') {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillText(text, xPos, yPos);
    }
}
//# sourceMappingURL=Scene.js.map