import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import ImageProp from '../../Props/ImageProp.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import UserData from '../../UserData.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
import CutScene from '../../CutScene.js';
import DoodleNPC from './NPC_Doodle/DoodleNPC.js';
import HubNPC from './HubNPC.js';
import TempleRunNPC from './NPC_Temple_Run/TempleRunNPC.js';
import MenuCutScene from '../MenuCutScene.js';
import PokeNPC from './NPC_PokeTale/PokeNPC.js';
import GameInfo from '../../GameInfo.js';
import PokeTaleInfo from '../Poke-Tale/Info/PokeTaleInfo.js';
import Platform from '../../Props/Platform.js';
import BossNPC from './NPC_Boss/BossNPC.js';

export default class HubScene extends GameLevel {
  private player: HubPlayer;

  private props: Prop[];

  private NPCs: HubNPC[];

  private nextScene: Scene | null

  private cutScene: null | CutScene;

  private backgroundMusicHub: HTMLAudioElement;

  private isPlayingHub: boolean;

  public constructor(canvas: HTMLCanvasElement, userData: UserData, isPlayingHub?: boolean, backgroundMusicHub?: HTMLAudioElement| null) {
    super(canvas, userData)

    const platformHeight = (this.canvas.height / 5)

    this.props = [
      // Portal platforms
      // Left top
      new Platform(0, platformHeight * 2, this.canvas.width / 5, this.canvas.height / 20),
      // new Teleporter(0, (this.canvas.height / 4) - 150, this.canvas.width / 10, 200, 'hub'),

      // Left bottom
      new Platform(0, platformHeight * 4, this.canvas.width / 5, this.canvas.height / 20),
      // new Teleporter(0, ((this.canvas.height / 4) * 3 - 200), this.canvas.width / 10, 200, 'menu'),

      // Right top
      new Platform((this.canvas.width / 5) * 4, platformHeight * 2, this.canvas.width / 5, this.canvas.height / 20),

      // Right bottom
      new Platform((this.canvas.width / 5) * 4, platformHeight * 4, this.canvas.width / 5, this.canvas.height / 20),
    ];

    this.isPlayingHub = isPlayingHub ? true : false;

    // background music
    if (this.isPlayingHub === false) {
      this.backgroundMusicHub = new Audio(GameInfo.SOUND_PATH + 'hub-music.mp3');
      this.backgroundMusicHub.loop = true;
      this.backgroundMusicHub.volume = 0.1
      this.backgroundMusicHub.play();
      this.isPlayingHub = true;
    } else {
      if (backgroundMusicHub !== undefined) this.backgroundMusicHub = backgroundMusicHub;
    }
    

    this.NPCs = [
      new TempleRunNPC(this.canvas.width / 7, (platformHeight * 4) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
      new DoodleNPC((canvas.width / 20) * 16, ((platformHeight * 4) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
      new PokeNPC((canvas.width / 20) * 16, ((platformHeight * 2) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
    ]

    if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).finished) {
      this.props.push(new Platform((this.canvas.width / 2) - (this.canvas.width / 10), ((this.canvas.height / 3) * 2), this.canvas.width / 5, this.canvas.height / 20))
      this.NPCs.push(new BossNPC((this.canvas.width / 2) - (canvas.width / 10), ((this.canvas.height / 3) * 2) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData))
    }

    this.player = new HubPlayer(this.canvas.width / 2, (this.canvas.height / 5) * 4, this.canvas.width / 25, this.canvas.height / 8, this.userData)

    this.cutScene = null
    this.nextScene = this
  }

  /**
   * drawing the scene
   */
   public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(Game.loadNewImage(GameInfo.IMG_PATH + 'background.jpg'), 0, 0, this.canvas.width, this.canvas.height)
    this.props.forEach((prop) => {
      prop.draw(this.ctx);
    });

    this.NPCs.forEach((NPC) => {
      NPC.draw(this.ctx);
    })
    this.player.draw(this.ctx);

    // Draw text on canvas.
    Scene.writeTextToCanvas(
      this.ctx,
      `Munten: ${this.userData.getCoins()}`,
        this.canvas.width / 2,
        this.canvas.height / 20,
        this.canvas.height / 25,
        'white',
        'center',
        'middle',
    )

    if (this.cutScene !== null) {
      this.cutScene.draw()
    }

  }

  /**
   * processing the input of the scene
   */
  public processInput(): void {
    if (this.cutScene === null) {
      this.player.processInput();
    } else {
      this.cutScene.processInput()
    }
  }

  /**
   * update the scene
   *
   * @returns Next Scene
   */
  public update = (elapsed: number): Scene => {
    if (this.cutScene === null) {
      let contacts: number[] = []

      this.props.forEach((prop) => {
        if (CollideHandler.collides(this.player, prop)) {
          if (!this.player.isGoingThroughPlatform()) {
            const contact = CollideHandler.getContactData(this.player, prop);
            contacts.push(contact)
            if (contact === CollideHandler.TOP_CONTACT) {
              this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
            } 
          }

          // else if (contact === CollideHandler.BOTTOM_CONTACT) {
          //   this.player.setYPos(prop.getMaxYPos())
          // }

        }
      });

      this.NPCs.forEach((NPC) => {
        if (CollideHandler.collides(this.player, NPC)) {
          if (this.player.isInteracting()) {
            this.cutScene = NPC.interact()
          }
        }
        NPC.removeDelay(elapsed)
        const NPCTeleporter = NPC.getTeleporter()
        if (CollideHandler.collides(this.player, NPCTeleporter)) {
          if (NPCTeleporter.isActivated()) {
            this.nextScene = SceneSelector.getClassFromString(NPCTeleporter.getDestinationScene(), this.canvas, this.userData)
          }
        }

      });

      this.player.move(this.canvas, contacts, elapsed);

      if (this.player.isPausing()) {
        this.cutScene = new MenuCutScene(this.canvas, this.userData, this.backgroundMusicHub, true)
      }

    } else {
      const cutsceneDone = this.cutScene.update(elapsed)
      if (cutsceneDone) {
        let optionalCutScene = this.cutScene.getOptionalScene()
        if (optionalCutScene) this.nextScene = optionalCutScene
        this.cutScene = null
      };
    }
    if (this.nextScene !== this && !(this.nextScene instanceof HubScene)) {
      this.backgroundMusicHub.pause()
      this.backgroundMusicHub = null
    }
    return this.nextScene
  }
}
