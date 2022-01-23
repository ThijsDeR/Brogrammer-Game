import Prop from './Prop.js';

export default class RectProp extends Prop {
  protected color: string;

  private style: 'fill' | 'stroke';

  /**
   * Initialize RectProp
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param color color
   * @param style fill or stroke
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    style: 'fill' | 'stroke',
  ) {
    super(xPos, yPos, width, height);

    this.color = color;
    this.style = style;
  }

  /**
   * draw the rectprop to the screen
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY offsety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width / 200 + this.height / 200;
    ctx.fillStyle = this.color;
    ctx.rect(this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
    if (this.style === 'fill') ctx.fill();
    else if (this.style === 'stroke') ctx.stroke();
  }
}
