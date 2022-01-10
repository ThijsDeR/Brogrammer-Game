import ImageProp from './ImageProp.js';
export default class NPC extends ImageProp {
    activated;
    constructor(xpos, ypos, imageSrc, width = undefined, height = undefined) {
        super(xpos, ypos, imageSrc, width, height);
        this.activated = false;
    }
    isActivated() {
        return this.activated;
    }
}
//# sourceMappingURL=NPC.js.map