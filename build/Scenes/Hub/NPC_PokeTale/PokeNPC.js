import GameInfo from '../../../GameInfo.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';
export default class PokeNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'Ash.png', width, height, 'poketale', 'right', 'Poketale');
        this.userData = userData;
        this.cutScene = new PokeNPCCutscene(canvas, userData, this);
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
        if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished === true)
            this.teleporter.activate();
    }
}
