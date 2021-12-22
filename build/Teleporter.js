import ImageProp from './ImageProp.js';
export default class Teleporter extends ImageProp {
    destinationScene;
    constructor(xPos, yPos, width = undefined, height = undefined, scene) {
        super(xPos, yPos, './assets/img/Portal.png', width, height);
        this.destinationScene = scene;
    }
    getDestinationScene() {
        return this.destinationScene;
    }
}
//# sourceMappingURL=Teleporter.js.map