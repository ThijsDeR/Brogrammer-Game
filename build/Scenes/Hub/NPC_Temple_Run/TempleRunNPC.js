import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';
export default class TempleRunNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/Temple-Run/opa.png', width, height, 'templerun', 'left', 'Grot Plotter');
        this.userData = userData;
        this.cutScene = new TempleRunNPCCutscene(canvas, userData, this);
    }
    interact() {
        const originalData = this.userData.getNPCStoryProgress('templerun');
        if (this.userData.getNPCStoryProgress('doodle').finished) {
            this.userData.changeNPCStoryProgress({ name: 'templerun', talkedTo: true, finished: originalData.finished });
        }
        return this.cutScene;
    }
    finishInteraction() {
        if (this.userData.getNPCStoryProgress('doodle').finished === true)
            this.teleporter.activate();
    }
}
//# sourceMappingURL=TempleRunNPC.js.map