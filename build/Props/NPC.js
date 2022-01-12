import ImageProp from './ImageProp.js';
export default class NPC extends ImageProp {
    activated;
    constructor(xPos, yPos, imageSrc, width = undefined, height = undefined) {
        super(xPos, yPos, imageSrc, width, height);
        this.activated = false;
    }
    isActivated() {
        return this.activated;
    }
}
//# sourceMappingURL=NPC.js.map