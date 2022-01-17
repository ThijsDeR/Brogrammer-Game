import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';
export default class PokeNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/Ash.png', width, height, 'poketale', 'right', 'Poketale');
        this.userData = userData;
        this.cutScene = new PokeNPCCutscene(canvas, userData, this);
    }
    interact() {
        const originalData = this.userData.getNPCStoryProgress('poke');
        if (this.userData.getNPCStoryProgress('templerun').finished) {
            this.userData.changeNPCStoryProgress({ name: 'poke', talkedTo: true, finished: originalData.finished });
        }
        return this.cutScene;
    }
    finishInteraction() {
        if (this.userData.getNPCStoryProgress('templerun').finished === true)
            this.teleporter.activate();
    }
}
//# sourceMappingURL=PokeNPC.js.map