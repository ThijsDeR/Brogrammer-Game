import Scene from '../Scene.js';
import RectProp from './RectProp.js';
export default class Button extends RectProp {
    text;
    fontSize;
    id;
    originalColor;
    hoverColor;
    constructor(xPos, yPos, width, height, color, hoverColor, text, fontSize, id) {
        super(xPos, yPos, width, height, color, 'stroke');
        this.originalColor = color;
        this.text = text;
        this.fontSize = fontSize;
        this.id = id;
        this.hoverColor = hoverColor;
    }
    draw(ctx) {
        super.draw(ctx);
        Scene.writeTextToCanvas(ctx, this.text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), this.fontSize, 'white', 'center', 'middle', this.width);
    }
    isHovered(mouseCoords) {
        if (mouseCoords.x > this.getMinXPos()
            && mouseCoords.x < this.getMaxXPos()
            && mouseCoords.y > this.getMinYPos()
            && mouseCoords.y < this.getMaxYPos())
            return true;
        return false;
    }
    getId() {
        return this.id;
    }
    doHover(mouseCoords) {
        if (this.isHovered(mouseCoords)) {
            this.color = this.hoverColor;
        }
        else
            this.color = this.originalColor;
    }
}
//# sourceMappingURL=Button.js.map