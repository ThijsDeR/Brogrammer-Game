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
    static writeTextToCanvas(ctx, text, xPos, yPos, fontSize = 20, color = 'white', textAlign = 'center', textBaseline = 'middle', maxWidth = 10000) {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        const words = text.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
            const tempLine = line + words[i] + ' ';
            const metrics = ctx.measureText(tempLine);
            const tempWidth = metrics.width;
            if (tempWidth > maxWidth && i > 0) {
                ctx.fillText(line, xPos, yPos);
                line = words[i] + ' ';
                yPos += fontSize;
            }
            else {
                line = tempLine;
            }
        }
        ctx.fillText(line, xPos, yPos);
    }
}
//# sourceMappingURL=Scene.js.map