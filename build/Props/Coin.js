import ImageProp from './ImageProp.js';
export default class Coin extends ImageProp {
    points;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/coin.png', width, height);
        this.points = 1;
    }
    getPoints() {
        return this.points;
    }
}
//# sourceMappingURL=Coin.js.map