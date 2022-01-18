import GameInfo from '../../../GameInfo.js';
import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import SonNPCCutscene from './SonNPCCutscene.js';
export default class SonNPC extends NPC {
    cutScene;
    name;
    constructor(xpos, ypos, width = undefined, height = undefined, canvas, userData) {
        super(xpos, ypos, GameInfo.IMG_PATH + 'son.png', width, height);
        this.cutScene = new SonNPCCutscene(canvas, userData, this);
        this.name = 'Son';
    }
    draw(ctx, offsetX, offsetY) {
        super.draw(ctx, offsetX, offsetY);
        Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2) - offsetX, this.yPos - 20 - offsetY, this.height / 4, 'white');
    }
    interact() {
        return this.cutScene;
    }
    finishInteraction() {
    }
}
