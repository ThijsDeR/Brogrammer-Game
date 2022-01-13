import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import ImageProp from '../../Props/ImageProp.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
import DoodleNPC from './NPC_Doodle/DoodleNPC.js';
import TempleRunNPC from './NPC_Temple_Run/TempleRunNPC.js';
export default class HubScene extends GameLevel {
    player;
    props;
    NPCs;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        const platformHeight = (canvas.height / 5);
        this.props = [
            new ImageProp(0, platformHeight * 2, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
            new ImageProp(0, platformHeight * 4, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
            new ImageProp((canvas.width / 5) * 4, platformHeight * 2, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
            new ImageProp((canvas.width / 5) * 4, platformHeight * 4, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
        ];
        this.NPCs = [
            new TempleRunNPC(this.canvas.width / 7, (platformHeight * 4) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
            new DoodleNPC((canvas.width / 20) * 16, ((platformHeight * 4) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
            new DoodleNPC((canvas.width / 20) * 16, (platformHeight * 2) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData)
        ];
        this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8);
        this.cutScene = null;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage('./assets/img/background.jpg'), 0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.NPCs.forEach((NPC) => {
            NPC.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, `Munten: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20, 'black', 'center', 'middle');
        if (this.cutScene !== null) {
            this.cutScene.draw();
        }
    }
    processInput() {
        if (this.cutScene === null) {
            this.player.processInput();
        }
        else {
            this.cutScene.processInput();
        }
    }
    update = (elapsed) => {
        let nextScene = this;
        if (this.cutScene === null) {
            let contacts = [];
            this.props.forEach((prop) => {
                if (CollideHandler.collides(this.player, prop)) {
                    const contact = CollideHandler.getContactData(this.player, prop);
                    contacts.push(contact);
                    if (contact === CollideHandler.TOP_CONTACT) {
                        this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                    }
                    else if (contact === CollideHandler.BOTTOM_CONTACT) {
                        this.player.setYPos(prop.getMaxYPos());
                    }
                }
            });
            this.NPCs.forEach((NPC) => {
                if (CollideHandler.collides(this.player, NPC)) {
                    if (this.player.isInteracting()) {
                        this.cutScene = NPC.interact();
                    }
                }
                const NPCTeleporter = NPC.getTeleporter();
                if (CollideHandler.collides(this.player, NPCTeleporter)) {
                    if (NPCTeleporter.isActivated()) {
                        nextScene = SceneSelector.getClassFromString(NPCTeleporter.getDestinationScene(), this.canvas, this.userData);
                    }
                }
            });
            this.player.move(this.canvas, contacts, elapsed);
        }
        else {
            const cutsceneDone = this.cutScene.update(elapsed);
            if (cutsceneDone)
                this.cutScene = null;
        }
        return nextScene;
    };
}
//# sourceMappingURL=HubScene.js.map