import Scene from "../Scene.js";
import Prop from "./Prop.js";
export default class Text extends Prop {
    text;
    color;
    fontSize;
    textAlign;
    textBaseLine;
    constructor(xPos, yPos, width, height, text, color = 'black', fontSize = 20, textAlign = 'center', textBaseLine = 'middle') {
        super(xPos, yPos, width, height);
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
        this.textBaseLine = textBaseLine;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        Scene.writeTextToCanvas(ctx, this.text, this.xPos - offsetX, this.yPos - offsetY, this.fontSize, this.color, this.textAlign, this.textBaseLine);
    }
    move(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }
}
