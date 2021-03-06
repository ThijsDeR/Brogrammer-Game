import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import UserData from '../../UserData.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
import DoodleNPC from './NPC_Doodle/DoodleNPC.js';
import TempleRunNPC from './NPC_Temple_Run/TempleRunNPC.js';
import MenuCutScene from '../MenuCutScene.js';
import PokeNPC from './NPC_PokeTale/PokeNPC.js';
import GameInfo from '../../GameInfo.js';
import PokeTaleInfo from '../Poke-Tale/Info/PokeTaleInfo.js';
import Platform from '../../Props/Platform.js';
import BossNPC from './NPC_Boss/BossNPC.js';
import HubInfo from './Info/HubInfo.js';
export default class HubScene extends GameLevel {
    player;
    props;
    nPCs;
    nextScene;
    cutScene;
    backgroundMusicHub;
    isPlayingHub;
    constructor(canvas, userData, isPlayingHub, backgroundMusicHub) {
        super(canvas, userData);
        const platformHeight = (this.canvas.height / 5);
        this.props = [
            new Platform(0, platformHeight * 2, this.canvas.width / 5, this.canvas.height / 20),
            new Platform(0, platformHeight * 4, this.canvas.width / 5, this.canvas.height / 20),
            new Platform((this.canvas.width / 5) * 4, platformHeight * 2, this.canvas.width / 5, this.canvas.height / 20),
            new Platform((this.canvas.width / 5) * 4, platformHeight * 4, this.canvas.width / 5, this.canvas.height / 20),
        ];
        this.isPlayingHub = !!isPlayingHub;
        if (this.isPlayingHub === false) {
            this.backgroundMusicHub = new Audio(`${GameInfo.SOUND_PATH}hub-music.mp3`);
            this.backgroundMusicHub.loop = true;
            this.backgroundMusicHub.volume = HubInfo.BACKGROUND_MUSIC_VOLUME
                * (this.userData.getSoundProcent(UserData.MASTER_SOUND_OBJECT_NAME) / 100)
                * (this.userData.getSoundProcent(UserData.MUSIC_SOUND_OBJECT_NAME) / 100);
            this.backgroundMusicHub.play();
            this.isPlayingHub = true;
        }
        else if (backgroundMusicHub !== undefined)
            this.backgroundMusicHub = backgroundMusicHub;
        this.nPCs = [
            new TempleRunNPC(this.canvas.width / 7, (platformHeight * 4) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
            new DoodleNPC((canvas.width / 20) * 16, ((platformHeight * 4) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
            new PokeNPC((canvas.width / 20) * 16, ((platformHeight * 2) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
        ];
        if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).finished) {
            this.props.push(new Platform((this.canvas.width / 2) - (this.canvas.width / 10), ((this.canvas.height / 3) * 2), this.canvas.width / 5, this.canvas.height / 20));
            this.nPCs.push(new BossNPC((this.canvas.width / 2) - (canvas.width / 10), ((this.canvas.height / 3) * 2) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData));
        }
        this.player = new HubPlayer(this.canvas.width / 2, (this.canvas.height / 5) * 4, this.canvas.width / 25, this.canvas.height / 8, this.userData);
        this.cutScene = null;
        this.nextScene = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(Game.loadNewImage(`${GameInfo.IMG_PATH}background.jpg`), 0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.nPCs.forEach((nPC) => {
            nPC.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        Scene.writeTextToCanvas(this.ctx, `Munten: ${this.userData.getCoins()}`, this.canvas.width / 2, this.canvas.height / 20, this.canvas.height / 25, 'white', 'center', 'middle');
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
                if (CollideHandler.collides(this.player, nPC)) {
                    if (this.player.isInteracting()) {
                        this.cutScene = nPC.interact();
                    }
                }
                nPC.removeDelay(elapsed);
                const nPCTeleporter = nPC.getTeleporter();
                if (CollideHandler.collides(this.player, nPCTeleporter)) {
                    if (nPCTeleporter.isActivated()) {
                        this.nextScene = SceneSelector.getClassFromString(nPCTeleporter.getDestinationScene(), this.canvas, this.userData);
                    }
                }
            });
            this.player.move(this.canvas, contacts, elapsed);
            if (this.player.isPausing()) {
                this.cutScene = new MenuCutScene(this.canvas, this.userData, this.backgroundMusicHub, true);
            }
        }
        else {
            const cutsceneDone = this.cutScene.update(elapsed);
            if (cutsceneDone) {
                const optionalCutScene = this.cutScene.getOptionalScene();
                if (optionalCutScene)
                    this.nextScene = optionalCutScene;
                this.cutScene = null;
            }
        }
        if (this.nextScene !== this && !(this.nextScene instanceof HubScene)) {
            this.backgroundMusicHub.pause();
            this.backgroundMusicHub = null;
        }
        return this.nextScene;
    };
}
