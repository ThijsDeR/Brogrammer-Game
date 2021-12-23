import Scene from '../Scene.js';
import RectProp from './RectProp.js';
export default class Button extends RectProp {
    text;
    fontSize;
    id;
    constructor(xPos, yPos, width, height, color, text, fontSize, id) {
        super(xPos, yPos, width, height, color, 'stroke');
        this.text = text;
        this.fontSize = fontSize;
        this.id = id;
    }
    draw(ctx) {
        super.draw(ctx);
        Scene.writeTextToCanvas(ctx, this.text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), this.fontSize);
    }
    isPressed(mouseCoords) {
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
}
//# sourceMappingURL=Button.js.map