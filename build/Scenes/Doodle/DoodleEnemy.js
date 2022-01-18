import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
export default class DoodleEnemy extends ImageProp {
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, GameInfo.IMG_PATH + 'Slime.png', width, height);
    }
}
