import CollideHandler from '../CollideHandler.js';
import GameLevel from '../GameLevel.js';
import ImageProp from '../ImageProp.js';
import Prop from '../Prop.js';
import Scene from '../Scene.js';
import SceneSelector from '../SceneSelector.js';
import Teleporter from '../Teleporter.js';
import TextProp from '../TextProp.js';
import UserData from '../UserData.js';
import HubPlayer from './HubPlayer.js';

export default class HubScene extends GameLevel {
  private player: HubPlayer;

  private props: Prop[];

  private texts: TextProp[];
  
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      // Portal platforms
      new ImageProp(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new ImageProp(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
      new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),

      // Portals
      new Teleporter(0, (canvas.height / 4) - 150, canvas.width / 10, 200, 'hub'),
      new Teleporter(0, ((canvas.height / 4) * 2), canvas.width / 10, 200, 'menu'),
      new Teleporter((canvas.width / 20) * 18, (canvas.height / 4) - 150, canvas.width / 10, 200, 'doodle'),
      new Teleporter((canvas.width / 20) * 18, ((canvas.height / 4) * 2), canvas.width / 10, 200, 'doodle'),
    ];

    this.texts = [
      new TextProp(
        `Coins: ${this.userData.getCoins()}`,
        this.canvas.width / 2,
        40,
        20,
      )
    ]

    this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, 100, 100)
  }

  /**
   * drawing the scene
   */
   public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.props.forEach((prop) => {
      prop.draw(this.ctx);
    });

    // Draw text on canvas.
    console.log(this.userData.getCoins())
    this.texts.forEach((text) => {
      text.draw(this.ctx)
    })
  }

  /**
   * processing the input of the scene
   */
  public processInput(): void {
    this.player.processInput();
  }

  /**
   * update the scene
   *
   * @returns Next Scene
   */
  public update = (elapsed: number): Scene => {
    let contacts: number[] = []
    let nextScene: Scene = this
    this.props.forEach((prop) => {
      if (CollideHandler.collides(this.player, prop)) {
        const contact = CollideHandler.getContactData(this.player, prop);
        contacts.push(contact)

        if (contact === CollideHandler.TOP_CONTACT) {
          this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
        } else if (contact === CollideHandler.BOTTOM_CONTACT) {
          this.player.setYPos(prop.getMaxYPos())
        }

        if (prop instanceof Teleporter) {
          nextScene = SceneSelector.getClassFromString(prop.getDestinationScene(), this.canvas, this.userData)
        }
      }
    });
    this.player.move(this.canvas, contacts, elapsed);
    return nextScene
  }
}