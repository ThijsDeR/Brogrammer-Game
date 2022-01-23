import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';
export default class Teleporter extends ImageProp {
    destinationScene;
    activated;
    constructor(xPos, yPos, width = undefined, height = undefined, scene) {
        super(xPos, yPos, `${GameInfo.IMG_PATH}Portal.png`, width, height);
        this.destinationScene = scene;
        this.activated = false;
    }
    getDestinationScene() {
        return this.destinationScene;
    }
    activate() {
        this.activated = true;
    }
    isActivated() {
        return this.activated;
    }
}
