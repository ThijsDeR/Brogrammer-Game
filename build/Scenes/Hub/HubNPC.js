import NPC from '../../Props/NPC.js';
import Teleporter from '../../Props/Teleporter.js';
export default class HubNPC extends NPC {
    scene;
    teleporter;
    constructor(xPos, yPos, imageSrc, width = undefined, height = undefined, teleporter, direction) {
        super(xPos, yPos, imageSrc, width, height);
        let teleporterxPos;
        if (direction === 'right')
            teleporterxPos = xPos + (width * 1.5);
        else if (direction === 'left')
            teleporterxPos = xPos - (width * 2) - (width * 0.5);
        this.teleporter = new Teleporter(teleporterxPos, yPos - height, width * 2, height * 2, teleporter);
    }
    draw(ctx, offsetX, offsetY) {
        super.draw(ctx, offsetX, offsetY);
        this.teleporter.draw(ctx, offsetX, offsetY);
    }
    getTeleporter() {
        return this.teleporter;
    }
}
//# sourceMappingURL=HubNPC.js.map