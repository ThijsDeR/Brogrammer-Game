import CollideHandler from '../../CollideHandler.js';
import GameLevel from '../../GameLevel.js';
import ImageProp from '../../Props/ImageProp.js';
import Prop from '../../Props/Prop.js';
import Scene from '../../Scene.js';
import SceneSelector from '../../SceneSelector.js';
import Teleporter from '../../Props/Teleporter.js';
import UserData from '../../UserData.js';
import HubPlayer from './HubPlayer.js';
import Game from '../../Game.js';
import CutScene from '../../CutScene.js';
import DoodleNPC from './NPC_Doodle/DoodleNPC.js';
import HubNPC from './HubNPC.js';
import TempleRunNPC from './NPC_Temple_Run/TempleRunNPC.js';


export default class HubScene extends GameLevel {
  private player: HubPlayer;

  private props: Prop[];

  private NPCs: HubNPC[];

  private cutScene: null | CutScene;

  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    const platformHeight = (canvas.height / 5)

    this.props = [
      // Portal platforms
      // Left top
      new ImageProp(0, platformHeight * 2, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
      // new Teleporter(0, (canvas.height / 4) - 150, canvas.width / 10, 200, 'hub'),

      // Left bottom
      new ImageProp(0, platformHeight * 4, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
      // new Teleporter(0, ((canvas.height / 4) * 3 - 200), canvas.width / 10, 200, 'menu'),

      // Right top
      new ImageProp((canvas.width / 5) * 4, platformHeight * 2, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),

      // Right bottom
      new ImageProp((canvas.width / 5) * 4, platformHeight * 4, './assets/img/platform.png', canvas.width / 5, this.canvas.height / 20),
    ];

    this.NPCs = [
      new TempleRunNPC(this.canvas.width / 7, (platformHeight * 4) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
      new DoodleNPC((canvas.width / 20) * 16, ((platformHeight * 4) - (this.canvas.height / 10)), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData),
      new DoodleNPC((canvas.width / 20) * 16, (platformHeight * 2) - (this.canvas.height / 10), canvas.width / 20, (this.canvas.height / 10), this.canvas, this.userData)
    ]

    this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8)

    this.cutScene = null
  }

  /**
   * drawing the scene
   */
   public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(Game.loadNewImage('./assets/img/background.jpg'), 0, 0, this.canvas.width, this.canvas.height)
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
        this.canvas.width / 40,
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
    let nextScene: Scene = this
    if (this.cutScene === null) {
      let contacts: number[] = []

      this.props.forEach((prop) => {
        if (CollideHandler.collides(this.player, prop)) {
          const contact = CollideHandler.getContactData(this.player, prop);
          contacts.push(contact)
          if (contact === CollideHandler.TOP_CONTACT) {
            this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
          } else if (contact === CollideHandler.BOTTOM_CONTACT) {
            this.player.setYPos(prop.getMaxYPos())
          }

        }
      });

      this.NPCs.forEach((NPC) => {
        if (CollideHandler.collides(this.player, NPC)) {
          if (this.player.isInteracting()) {
            this.cutScene = NPC.interact()
          }
        }
        const NPCTeleporter = NPC.getTeleporter()
        if (CollideHandler.collides(this.player, NPCTeleporter)) {
          if (NPCTeleporter.isActivated()) {
            nextScene = SceneSelector.getClassFromString(NPCTeleporter.getDestinationScene(), this.canvas, this.userData)
          }
        }

      });

      this.player.move(this.canvas, contacts, elapsed);
    } else {
      const cutsceneDone = this.cutScene.update(elapsed)
      if (cutsceneDone) this.cutScene = null;
    }

    return nextScene
  }
}
