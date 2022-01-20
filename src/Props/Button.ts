import Scene from '../Scene.js';
import RectProp from './RectProp.js';

export default class Button extends RectProp{
  private text: string;

  private fontSize: number;

  private id: string;

  private originalColor: string;

  private hoverColor: string;

  private textColor: string;

  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    textColor: string,
    hoverColor: string,
    text: string,
    fontSize: number,
    id: string,
  ) {
    super(xPos, yPos, width, height, color, 'stroke')

    this.originalColor = color
    this.text = text
    this.fontSize = fontSize
    this.id = id
    this.hoverColor = hoverColor
    this.textColor = textColor
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx)
    Scene.writeTextToCanvas(
      ctx,
      this.text,
      this.xPos + (this.width / 2),
      this.yPos + (this.height / 2),
      this.fontSize,
      this.textColor,
      'center',
      'middle',
      this.width,
    )
  }

  public isHovered(mouseCoords: {x: number, y: number}): boolean {
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

  public doHover(mouseCoords: {x: number, y: number}): void {
    if (this.isHovered(mouseCoords)) {
      this.color = this.hoverColor;
    }
    else this.color = this.originalColor
  }

}
