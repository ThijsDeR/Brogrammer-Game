export default class Prop {
    xPos;
    yPos;
    width;
    height;
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    getMinXPos() {
        return this.xPos;
    }
    getMaxXPos() {
        return this.xPos + this.width;
    }
    getMaxYPos() {
        return this.yPos + this.height;
    }
    getMinYPos() {
        return this.yPos;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    setXPos(xPos) {
        this.xPos = xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
}
//# sourceMappingURL=Prop.js.map