import Button from '../../Props/Button.js';
import CollideHandler from '../../CollideHandler.js';
import Scene from '../../Scene.js';
import MenuScene from './MenuScene.js';
import MainNPC from './MainNPC.js';
import SceneSelector from '../../SceneSelector.js';
import HubPlayer from '../Hub/HubPlayer.js';
export default class ControlsScene extends Scene {
    props;
    nextScene;
    player;
    NPCs;
    cutScene;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.props = [
            new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
        ];
        this.cutScene = null;
        this.nextScene = this;
        this.NPCs = [
            new MainNPC(this.canvas.width / 42, ((canvas.height / 4) * 3.6) - (this.canvas.height / 11), canvas.width / 10, (this.canvas.height / 5), this.canvas, this.userData),
        ];
        this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8);
        const clickFunction = (event) => {
            let originalNextScene = this.nextScene;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn')
                            this.nextScene = new MenuScene(this.canvas, this.userData);
                    }
                }
            });
            if (originalNextScene !== this.nextScene) {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = "#454443";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.NPCs.forEach((NPC) => {
            NPC.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        if (this.cutScene !== null) {
            this.cutScene.draw();
        }
        Scene.writeTextToCanvas(this.ctx, 'Controls', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op A en D om naar links en rechts te bewegen', this.canvas.width / 2, this.canvas.height / 4, this.canvas.height / 25, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op spatie om te springen', this.canvas.width / 2, (this.canvas.height / 20) * 6, this.canvas.height / 25, 'white');
        Scene.writeTextToCanvas(this.ctx, "Klik op E om met NPC'S te praten", this.canvas.width / 2, (this.canvas.height / 20) * 7, this.canvas.height / 25, 'white');
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
        return this.nextScene;
    };
}
//# sourceMappingURL=ControlsScene.js.map