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

export default class HubScene extends GameLevel {
  private player: HubPlayer;

  private props: Prop[];
  
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
      // Portal platforms
      // Left top
      new ImageProp(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new Teleporter(0, (canvas.height / 4) - 150, canvas.width / 10, 200, 'hub'),

      // Left bottom
      new ImageProp(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
      new Teleporter(0, ((canvas.height / 4) * 3 - 200), canvas.width / 10, 200, 'menu'),

      // Right top
      new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new Teleporter((canvas.width / 20) * 18, (canvas.height / 4) - 150, canvas.width / 10, 200, 'doodle'),

      // Right bottom
      new ImageProp((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
      new Teleporter((canvas.width / 20) * 18, ((canvas.height / 4) * 3 - 200), canvas.width / 10, 200, 'doodle'),   
      
    ];
  
    this.player = new HubPlayer(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 25, this.canvas.height / 8)
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
    this.player.draw(this.ctx);

    // Draw text on canvas.
    Scene.writeTextToCanvas(
      this.ctx,
      `Coins: ${this.userData.getCoins()}`,
        this.canvas.width / 2,
        40,
        20,
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Hub',
      75,
      (this.canvas.height / 4) - 170,
      20,
      'center',
      'middle',
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Menu',
      80,
      ((this.canvas.height / 4) * 3) - 220,
      20,
      'center',
      'middle',
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Doodle',
      (this.canvas.width / 20) * 19,
      (this.canvas.height / 4) - 170,
      20,
      'center',
      'middle',
      'white',
    )

    Scene.writeTextToCanvas(
      this.ctx,
      'Doodle',
      (this.canvas.width / 20) * 19,
      (this.canvas.height / 4) * 3 - 220,
      20,
      'center',
      'middle',
      'white',
    )
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