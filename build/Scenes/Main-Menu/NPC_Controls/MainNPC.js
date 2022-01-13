import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';
export default class MainNPC extends NPC {
    cutScene;
    name;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, './assets/img/sephiroth.png', width, height);
        this.cutScene = new TutorialNPCCutscene(canvas, userData, this);
        this.name = 'Tutorial';
    }
    draw(ctx, offsetX, offsetY) {
        super.draw(ctx, offsetX, offsetY);
        Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, this.height / 4, 'white');
    }
    interact() {
        return this.cutScene;
    }
}
//# sourceMappingURL=MainNPC.js.map