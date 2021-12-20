import CollideHandler from './CollideHandler.js';
import Player from './Player.js';
import Prop from './Prop.js';

export default class Scene {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private player: Player;

  private props: Prop[];

  /**
   * l
   *
   * @param canvas l
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.props = [
      // Portal platforms
      new Prop(0, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new Prop(0, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),
      new Prop((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/platform.png', canvas.width / 5, 65),
      new Prop((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/platform.png', canvas.width / 5, 65),

      // Portals
      new Prop(0, (canvas.height / 4) - 150, './assets/img/Portal.png', canvas.width / 10, 200),
      new Prop(0, ((canvas.height / 4) * 2), './assets/img/Portal.png', canvas.width / 10, 200),
      new Prop((canvas.width / 20) * 18, (canvas.height / 4) - 150, './assets/img/Portal.png', canvas.width / 10, 200),
      new Prop((canvas.width / 20) * 18, ((canvas.height / 4) * 2), './assets/img/Portal.png', canvas.width / 10, 200),
    ];

    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2, 100, 100);
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
   */
  public update(): void {
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
    this.player.move(this.canvas, contacts);
  }
}
