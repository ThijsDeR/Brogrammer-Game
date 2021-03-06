import Button from '../../Props/Button.js';
import GameInfo from '../../GameInfo.js';
import CollideHandler from '../../CollideHandler.js';
import Scene from '../../Scene.js';
import UserData from '../../UserData.js';
import MenuScene from './MenuScene.js';
import TutorialNPC from './NPC_Controls/TutorialNPC.js';
import HubPlayer from '../Hub/HubPlayer.js';
import MenuInfo from './Info/MenuInfo.js';
import Platform from '../../Props/Platform.js';
export default class ControlsScene extends Scene {
    props;
    nextScene;
    player;
    nPCs;
    cutScene;
    backgroundMusic;
    constructor(canvas, userData, backgroundMusic) {
        super(canvas, userData);
        this.props = [
            new Button(this.canvas.width / 150, this.canvas.height / 75, this.canvas.width / 15, this.canvas.height / 15, 'white', 'white', 'red', 'Terug', this.canvas.width / 75, 'backBtn'),
        ];
        this.cutScene = null;
        this.backgroundMusic = backgroundMusic;
        this.nextScene = this;
        this.nPCs = [
            new TutorialNPC(this.canvas.width / 42, ((canvas.height / 4) * 3.6) - (this.canvas.height / 11), canvas.width / 10, (this.canvas.height / 5), this.canvas, this.userData),
        ];
        this.props.push(new Platform((this.canvas.width / 2) - (this.canvas.width / 10), ((this.canvas.height / 3) * 2), this.canvas.width / 5, this.canvas.height / 20));
        this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        const clickFunction = (event) => {
            const originalNextScene = this.nextScene;
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'backBtn') {
                            this.nextScene = new MenuScene(this.canvas, this.userData, true, this.backgroundMusic);
                        }
                    }
                }
            });
            if (originalNextScene !== this.nextScene) {
                const buttonSound = new Audio(`${GameInfo.SOUND_PATH}UI_click.wav`);
                buttonSound.volume = MenuInfo.UI_CLICK_VOLUME
                    * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                    * (this.userData.getSoundProcent(UserData.UI_SOUND_OBJECT_NAME) / 100);
                buttonSound.play();
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            }
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    draw() {
        this.ctx.fillStyle = MenuInfo.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.nPCs.forEach((nPC) => {
            nPC.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        if (this.cutScene !== null) {
            this.cutScene.draw();
        }
        Scene.writeTextToCanvas(this.ctx, 'Besturing', this.canvas.width / 2, this.canvas.height / 10, this.canvas.height / 20, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op A en D of linker en rechter pijltje om naar links en rechts te bewegen', this.canvas.width / 2, this.canvas.height / 4, this.canvas.height / 25, 'white');
        Scene.writeTextToCanvas(this.ctx, 'Klik op spatie of pijltje omhoog om te springen en op S of pijltje omlaag om door platforms te vallen.', this.canvas.width / 2, (this.canvas.height / 20) * 7, this.canvas.height / 25, 'white', 'center', 'middle', this.canvas.width / 2);
        Scene.writeTextToCanvas(this.ctx, 'Loop naar een persoon en klik op E om met hem te praten.', this.canvas.width / 2, (this.canvas.height / 20) * 8, this.canvas.height / 25, 'white');
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
        if (this.cutScene === null) {
            const contacts = [];
            this.props.forEach((prop) => {
                if (CollideHandler.collides(this.player, prop)) {
                    if (!this.player.isGoingThroughPlatform()) {
                        const contact = CollideHandler.getContactData(this.player, prop);
                        contacts.push(contact);
                        if (contact === CollideHandler.TOP_CONTACT) {
                            this.player.setYPos(prop.getMinYPos() - this.player.getHeight());
                        }
                    }
                }
            });
            this.nPCs.forEach((nPC) => {
                nPC.removeDelay(elapsed);
                if (CollideHandler.collides(this.player, nPC)) {
                    if (this.player.isInteracting()) {
                        this.cutScene = nPC.interact();
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
