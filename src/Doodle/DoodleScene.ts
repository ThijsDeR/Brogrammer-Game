import CollideHandler from '../CollideHandler.js';
import GameLevel from '../GameLevel.js';
import ImageProp from '../ImageProp.js';
import Prop from '../Prop.js';
import Scene from '../Scene.js';
import UserData from '../UserData.js';
import DoodlePlayer from './DoodlePlayer.js';

export default class DoodleScene extends GameLevel {
  private player: DoodlePlayer;

  private props: Prop[];
  
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    super(canvas, userData)

    this.props = [
        new ImageProp((Math.random() * canvas.width) / 1.2, (canvas.height / 1.5), './assets/img/cloud.png', canvas.width / 5, 65),
        new ImageProp((Math.random() * canvas.width) / 1.2, (canvas.height / 3), './assets/img/cloud.png', canvas.width / 5, 65),
        new ImageProp((Math.random() * canvas.width) / 1.2, (canvas.height / 6), './assets/img/cloud.png', canvas.width / 5, 65),
        new ImageProp(0, 900, './assets/img/cloud.png', canvas.width, 150 ),
        new ImageProp(0, 900, './assets/img/cloud.png', canvas.width, 150 ),
    ];

    this.player = new DoodlePlayer(this.canvas.width / 2, this.canvas.height / 2, 100, 100)
  }

  /**
   * drawing the scene
   */
   public draw(): void {
    this.ctx.fillStyle = 'LightSkyBlue'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.props.forEach((prop) => {
      prop.draw(this.ctx);
    });

    // Draw text on canvas.
    console.log(this.userData.getCoins())
    this.writeTextToCanvas(
      `Coins: ${this.userData.getCoins()}`,
      this.canvas.width / 2,
      40,
      20,
      'center',
      'black'
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
    this.props.forEach((prop) => {
      if (CollideHandler.collides(this.player, prop)) {
        const contact = CollideHandler.getContactData(this.player, prop);
        contacts.push(contact)

        if (contact === CollideHandler.TOP_CONTACT) {
          this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
        }
      }
    });
    this.player.move(this.canvas, contacts, elapsed);
    return this
  }
}