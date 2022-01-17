import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';
export default class DoodleNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/dad.png', width, height, 'doodle', 'right', 'Wolkentrap');
        this.userData = userData;
        this.cutScene = new DoodleNPCCutscene(canvas, userData, this);
    }
    interact() {
        const originalData = this.userData.getNPCStoryProgress('doodle');
        this.userData.changeNPCStoryProgress({ name: 'doodle', talkedTo: true, finished: originalData.finished });
        return this.cutScene;
    }
    finishInteraction() {
        this.teleporter.activate();
    }
}
//# sourceMappingURL=DoodleNPC.js.map