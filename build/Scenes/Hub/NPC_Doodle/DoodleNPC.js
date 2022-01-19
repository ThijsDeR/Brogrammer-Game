import GameInfo from '../../../GameInfo.js';
import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';
export default class DoodleNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'dad.png', width, height, 'doodle', 'right', 'Wolkentrap');
        this.userData = userData;
        this.cutScene = new DoodleNPCCutscene(canvas, userData, this);
    }
    interact() {
        if (this.talkingDelay < 0)
            return this.cutScene;
        else
            return null;
    }
    finishInteraction() {
        this.teleporter.activate();
        this.talkingDelay = 1000;
    }
}
