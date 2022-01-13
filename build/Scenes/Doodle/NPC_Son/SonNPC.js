import NPC from '../../../Props/NPC.js';
import SonNPCCutscene from './SonNPCCutscene.js';
export default class SonNPC extends NPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/son.png', width, height);
        this.cutScene = new SonNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
    }
}
//# sourceMappingURL=SonNPC.js.map