import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import ImageProp from '../../Props/ImageProp.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
import DoodleNPC from './NPC_Doodle/DoodleNPC.js';
export default class HubScene extends GameLevel {
    player;
    props;
    NPCs;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new ImageProp(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new ImageProp(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
            new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
            new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
        ];
        this.NPCs = [
            new DoodleNPC((canvas.width / 20) * 16, ((canvas.height / 4) * 3 - 100), canvas.width / 20, 100, this.canvas, this.userData),
            new DoodleNPC((canvas.width / 20) * 16, (canvas.height / 4) - 50, canvas.width / 20, 100, this.canvas, this.userData)
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
        Scene.writeTextToCanvas(this.ctx, `Coins: ${this.userData.getCoins()}`, this.canvas.width / 2, 40, 20, 'center', 'middle', 'white');
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
                const NPCRocket = NPC.getTeleporter();
                if (CollideHandler.collides(this.player, NPCRocket)) {
                    if (NPCRocket.isActivated()) {
                        nextScene = SceneSelector.getClassFromString(NPCRocket.getDestinationScene(), this.canvas, this.userData);
                    }
                }
            });
            this.player.move(this.canvas, contacts, elapsed);
        }
        else {
            const cutsceneDone = this.cutScene.update(elapsed);
            console.log(cutsceneDone);
            if (cutsceneDone)
                this.cutScene = null;
        }
        return nextScene;
    };
}
//# sourceMappingURL=HubScene.js.map