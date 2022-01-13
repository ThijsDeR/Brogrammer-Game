import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';
export default class DoodleNPC extends HubNPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/dad.png', width, height, 'doodle', 'right', 'Cloud jump');
        this.cutScene = new DoodleNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
        this.teleporter.activate();
    }
}
//# sourceMappingURL=DoodleNPC.js.map