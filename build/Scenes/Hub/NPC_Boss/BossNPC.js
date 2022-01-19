import GameInfo from '../../../GameInfo.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import HubNPC from '../HubNPC.js';
import BossNPCCutscene from './BossNPCCutscene.js';
export default class BossNPC extends HubNPC {
    cutScene;
    userData;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'sephiroth.png', width, height, 'boss', 'right', 'EindBaas');
        this.userData = userData;
        this.cutScene = new BossNPCCutscene(canvas, userData, this);
    }
    interact() {
        if (this.talkingDelay < 0)
            return this.cutScene;
        else
            return null;
    }
    finishInteraction() {
        if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).finished === true)
            this.teleporter.activate();
        this.talkingDelay = 1000;
    }
}
