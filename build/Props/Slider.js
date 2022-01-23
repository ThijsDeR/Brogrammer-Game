import Scene from '../Scene.js';
import RectProp from './RectProp.js';
export default class Slider extends RectProp {
    id;
    text;
    textColor;
    originalColor;
    sliderColor;
    hoverColor;
    position;
    positionRectProp;
    constructor(xPos, yPos, width, height, color, sliderColor, hoverColor, position, text, textColor, id) {
        super(xPos, yPos, width, height, color, 'stroke');
        this.originalColor = color;
        this.id = id;
        this.hoverColor = hoverColor;
        this.sliderColor = sliderColor;
        this.position = position;
        this.positionRectProp = new RectProp(this.xPos - this.width / 20, this.yPos - this.height / 2, this.width / 10, this.height * 2, this.sliderColor, 'fill');
        this.text = text;
        this.textColor = textColor;
    }
    draw(ctx) {
        super.draw(ctx);
        this.positionRectProp.draw(ctx, -((this.position / 100) * this.width));
        Scene.writeTextToCanvas(ctx, this.text, this.xPos + (this.width * 1.5), this.yPos, this.height * 2, this.textColor);
    }
    isHovered(mouseCoords) {
        if (mouseCoords.x > this.getMinXPos()
            && mouseCoords.x < this.getMaxXPos()
            && mouseCoords.y > this.getMinYPos()
            && mouseCoords.y < this.getMaxYPos())
            return true;
        return false;
    }
    getPosition() {
        return Math.round(this.position);
    }
    changePosition(mouseCoords) {
        this.position = Math.round(((mouseCoords.x - this.xPos) / this.width) * 100);
        if (this.position > 100)
            this.position = 100;
        else if (this.position < 0)
            this.position = 0;
    }
    getId() {
        return this.id;
    }
    doHover(mouseCoords) {
        if (this.isHovered(mouseCoords))
            this.color = this.hoverColor;
        else
            this.color = this.originalColor;
    }
}
