import RectProp from './RectProp.js';
import TextProp from './TextProp.js';

export default class Button extends RectProp{
  private text: TextProp;

  private id: string;
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number,
    height: number,
    color: string,
    text: string,
    fontSize: number,
    id: string,
  ) {
    super(xPos, yPos, width, height, color)

    this.text = new TextProp(text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), fontSize);
    this.id = id
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx)
    this.text.draw(ctx)
  }

  public isPressed(mouseCoords: {x: number, y: number}): boolean {
    if (
      mouseCoords.x > this.getMinXPos()
      && mouseCoords.x < this.getMaxXPos()
      && mouseCoords.y > this.getMinYPos()
      && mouseCoords.y < this.getMaxYPos()
    ) return true
    return false
  }

  public getId(): string {
    return this.id
  }

}