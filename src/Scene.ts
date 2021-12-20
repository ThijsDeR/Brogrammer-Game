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
      new Prop((canvas.width / 5) * 0, (canvas.height / 4) + 50, './assets/img/kees.jpg', canvas.width / 5, 65),
      new Prop((canvas.width / 5) * 0, (canvas.height / 4) * 3, './assets/img/kees.jpg', canvas.width / 5, 65),
      new Prop((canvas.width / 5) * 4, (canvas.height / 4) + 50, './assets/img/kees.jpg', canvas.width / 5, 65),
      new Prop((canvas.width / 5) * 4, (canvas.height / 4) * 3, './assets/img/kees.jpg', canvas.width / 5, 65),

      // Portals
      new Prop(canvas.width / 20 * 0, (canvas.height / 4) - 150, './assets/img/Portal.png', 200, 200),
      new Prop(canvas.width / 20 * 0, ((canvas.height / 4) * 2) + 45, './assets/img/Portal.png', 200, 200),
      new Prop((canvas.width / 20) * 18, (canvas.height / 4) - 150, './assets/img/Portal.png', 200, 200),
      new Prop((canvas.width / 20) * 18, ((canvas.height / 4) * 2) + 45, './assets/img/Portal.png', 200, 200),
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
        if (contact === CollideHandler.LEFT_CONTACT) {
          this.player.setXPos(prop.getMinXPos() - this.player.getWidth())
        } else if (contact === CollideHandler.RIGHT_CONTACT) {
          this.player.setXPos(prop.getMaxXPos())
        } else if (contact === CollideHandler.TOP_CONTACT) {
          console.log('very on top')
          this.player.setYPos(prop.getMinYPos() - this.player.getHeight())
        } else if (contact === CollideHandler.BOTTOM_CONTACT) {
          this.player.setYPos(prop.getMaxYPos())
        }
      }
    });
    this.player.move(this.canvas, contacts);
  }
}
