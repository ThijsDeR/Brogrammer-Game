import ImageProp from './ImageProp.js';
export default class NPC extends ImageProp {
    activated;
    talkingDelay;
    constructor(xPos, yPos, imageSrc, width = undefined, height = undefined) {
        super(xPos, yPos, imageSrc, width, height);
        this.activated = false;
        this.talkingDelay = 1000;
    }
    removeDelay(elapsed) {
        this.talkingDelay -= elapsed;
    }
    isActivated() {
        return this.activated;
    }
}
