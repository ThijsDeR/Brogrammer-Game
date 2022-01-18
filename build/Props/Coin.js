import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';
export default class Coin extends ImageProp {
    points;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, GameInfo.IMG_PATH + 'coin.png', width, height);
        this.points = 1;
    }
    getPoints() {
        return this.points;
    }
}
//# sourceMappingURL=Coin.js.map