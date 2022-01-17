import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';
export default class PokeNPC extends HubNPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/Verkoper.png', width, height, 'poketale', 'right', 'Telefonie');
        this.cutScene = new PokeNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
        this.teleporter.activate();
    }
}
//# sourceMappingURL=PokeNPC.js.map