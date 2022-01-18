import GameInfo from '../../../GameInfo.js';
import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';
export default class TutorialNPC extends NPC {
    cutScene;
    name;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'sephiroth.png', width, height);
        this.cutScene = new TutorialNPCCutscene(canvas, userData, this);
        this.name = 'Instructie';
    }
    draw(ctx, offsetX, offsetY) {
        super.draw(ctx, offsetX, offsetY);
        Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, this.height / 4, 'white');
    }
    interact() {
        return this.cutScene;
    }
}
//# sourceMappingURL=TutorialNPC.js.map