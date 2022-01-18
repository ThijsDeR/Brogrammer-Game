import GameInfo from '../../../GameInfo.js';
import DoodleInfo from '../../Doodle/Info/DoodleInfo.js';
import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';
export default class TempleRunNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'Temple-Run/opa.png', width, height, 'templerun', 'left', 'Grot Plotter');
        this.userData = userData;
        this.cutScene = new TempleRunNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
        if (this.userData.getNPCStoryProgress(DoodleInfo.DOODLE_PROGRESS_OBJECT_NAME).finished === true)
            this.teleporter.activate();
    }
}
//# sourceMappingURL=TempleRunNPC.js.map