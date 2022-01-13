import HubNPC from '../Hub/HubNPC.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';
export default class MainNPC extends HubNPC {
    cutScene;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/sephiroth.png', width, height, 'controls', 'left', 'Tutorial');
        this.cutScene = new TutorialNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
}
//# sourceMappingURL=MainNPC.js.map