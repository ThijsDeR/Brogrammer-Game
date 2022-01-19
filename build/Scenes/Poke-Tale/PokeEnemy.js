import ImageProp from '../../Props/ImageProp.js';
export default class PokeEnemy extends ImageProp {
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/PokeEnemy.png', width, height);
    }
}
