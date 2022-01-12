import ImageProp from "../../Props/ImageProp.js";
export default class BigCoin extends ImageProp {
    points;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/coin.png', width, height);
        this.points = 10;
    }
    getPoints() {
        return this.points;
    }
}
//# sourceMappingURL=BigCoin.js.map