import Prop from './Prop.js';

export default class RectProp extends Prop {

  private color: string;
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number,
    height: number,
    color: string,
  ) {
    super(xPos, yPos, width, height);

    this.color = color;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.rect(this.xPos, this.yPos, this.width, this.height);
    ctx.stroke();
  }
}