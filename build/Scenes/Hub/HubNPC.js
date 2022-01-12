import NPC from '../../Props/NPC.js';
import Teleporter from '../../Props/Teleporter.js';
import Scene from '../../Scene.js';
export default class HubNPC extends NPC {
    scene;
    teleporter;
    name;
    constructor(xPos, yPos, imageSrc, width = undefined, height = undefined, teleporter, direction, name) {
        super(xPos, yPos, imageSrc, width, height);
        let teleporterxPos;
        if (direction === 'right')
            teleporterxPos = xPos + (width * 1.5);
        else if (direction === 'left')
            teleporterxPos = xPos - (width * 2) - (width * 0.5);
        this.teleporter = new Teleporter(teleporterxPos, yPos - height, width * 2, height * 2, teleporter);
        this.name = name;
    }
    draw(ctx, offsetX, offsetY) {
        super.draw(ctx, offsetX, offsetY);
        this.teleporter.draw(ctx, offsetX, offsetY);
        Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, 20, 'white');
    }
    getTeleporter() {
        return this.teleporter;
    }
}
//# sourceMappingURL=HubNPC.js.map