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
    writeTextToCanvas(text, xPos, yPos, fontSize = 20, textAlign = 'center', color = 'black') {
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = textAlign;
        this.ctx.fillText(text, xPos, yPos);
    }
}
//# sourceMappingURL=Scene.js.map