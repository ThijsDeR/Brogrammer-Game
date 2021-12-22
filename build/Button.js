import RectProp from './RectProp.js';
import TextProp from './TextProp.js';
export default class Button extends RectProp {
    text;
    id;
    constructor(xPos, yPos, width, height, color, text, fontSize, id) {
        super(xPos, yPos, width, height, color);
        this.text = new TextProp(text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), fontSize);
        this.id = id;
    }
    draw(ctx) {
        super.draw(ctx);
        this.text.draw(ctx);
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