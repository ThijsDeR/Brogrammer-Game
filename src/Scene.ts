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
      new Prop(500, 0, './assets/img/kees.jpg', 100, 400),
      new Prop(200, 300, './assets/img/kees.jpg', 400, 100),
      
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
        const coords = CollideHandler.getElasticData(this.player, prop);
        contact = coords.contact
        this.player.setXPos(coords.x);
        this.player.setYPos(coords.y);
      }
    });
    this.player.move(this.canvas, contact);
  }
}
