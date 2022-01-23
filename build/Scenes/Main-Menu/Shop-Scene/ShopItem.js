import Button from '../../../Props/Button.js';
import ImageProp from '../../../Props/ImageProp.js';
export default class ShopItem {
    img;
    button;
    name;
    cost;
    id;
    constructor(xPos, yPos, width, height, name, imageSrc, cost, id) {
        this.img = new ImageProp(xPos, yPos, imageSrc, width, (height / 4) * 3);
        this.button = new Button(xPos, yPos + (height / 4) * 3, width, (height / 4), 'black', 'white', 'red', 'Kopen', width / 10, 'buy');
        this.name = name;
        this.cost = cost;
        this.id = id;
    }
    draw(ctx) {
        this.img.draw(ctx);
        this.button.draw(ctx);
    }
    getName() {
        return this.name;
    }
    getCost() {
        return this.cost;
    }
    getId() {
        return this.id;
    }
    getImage() {
        return this.img;
    }
    isHovered(mouseCoords) {
        if (mouseCoords.x > this.img.getMinXPos()
            && mouseCoords.x < this.img.getMaxXPos()
            && mouseCoords.y > this.img.getMinYPos()
            && mouseCoords.y < this.button.getMaxYPos())
            return true;
        return false;
    }
    doHover(mouseCoords) {
        if (this.isHovered(mouseCoords)) {
            this.button.doHover({
                x: this.button.getMinXPos() + (this.button.getWidth() / 2),
                y: this.button.getMinYPos() + (this.button.getHeight() / 2),
            });
        }
        else {
            this.button.doHover(mouseCoords);
        }
    }
}
