import Prop from './Prop.js';
export default class Coin extends Prop {
    points;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/coin.png', width, height);
        this.points = 1;
    }
    getScore() {
        return this.points;
    }
}
//# sourceMappingURL=Coin.js.map