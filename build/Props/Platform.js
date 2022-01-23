import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';
export default class Platform extends ImageProp {
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, `${GameInfo.IMG_PATH}platform.png`, width, height);
    }
}
