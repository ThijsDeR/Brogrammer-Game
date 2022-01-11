import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';
export default class TempleRunNPC extends HubNPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/Dood.jpg', width, height, 'templerun', 'left');
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