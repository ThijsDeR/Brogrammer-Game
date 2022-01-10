import Prop from './Prop.js';

export default class RectProp extends Prop {
  protected color: string;

  private style: 'fill' | 'stroke';

  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    style: 'fill' | 'stroke'
  ) {
    super(xPos, yPos, width, height);

    this.color = color;
    this.style = style
  }

  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.rect(this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
    if (this.style === 'fill') ctx.fill()
    else if (this.style === 'stroke') ctx.stroke();
  }
}
