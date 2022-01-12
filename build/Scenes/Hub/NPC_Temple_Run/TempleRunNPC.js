import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';
export default class TempleRunNPC extends HubNPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/old_man.png', width, height, 'templerun', 'left', 'Cave escape');
        this.cutScene = new TempleRunNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
        this.teleporter.activate();
    }
}
//# sourceMappingURL=TempleRunNPC.js.map