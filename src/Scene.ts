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
      new Prop(0, 300, './assets/img/kees.jpg', 535, 65),
      new Prop(0, 705, './assets/img/kees.jpg', 535, 65),
      new Prop(1385, 300, './assets/img/kees.jpg', 535, 65),
      new Prop(1385, 705, './assets/img/kees.jpg', 535, 65),

      // Portals
      new Prop(40, 90, './assets/img/Portal.png', 200, 200),
      new Prop(40, 500, './assets/img/Portal.png', 200, 200),
      new Prop(1685, 90, './assets/img/Portal.png', 200, 200),
      new Prop(1685, 500, './assets/img/Portal.png', 200, 200),
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
    let contact = CollideHandler.NO_CONTACT
    this.props.forEach((prop) => {
      if (CollideHandler.collides(this.player, prop)) {
        contact = CollideHandler.getContactData(this.player, prop);

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
    this.player.move(this.canvas, contact);
  }
}
