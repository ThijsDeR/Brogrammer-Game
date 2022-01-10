import ImageProp from './ImageProp.js';
export default class Teleporter extends ImageProp {
    destinationScene;
    activated;
    constructor(xPos, yPos, width = undefined, height = undefined, scene) {
        super(xPos, yPos, './assets/img/Portal.png', width, height);
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
//# sourceMappingURL=Teleporter.js.map