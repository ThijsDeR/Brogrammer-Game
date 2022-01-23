import Scene from '../Scene.js';
import Prop from './Prop.js';

export default class Text extends Prop {
  private text: string;

  private color: string;

  private fontSize: number;

  private textAlign: CanvasTextAlign;

  private textBaseLine: CanvasTextBaseline;

  /**
   * Initialize Text
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param text text
   * @param color color
   * @param fontSize fontsize
   * @param textAlign text align
   * @param textBaseLine text baseline
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    text: string,
    color: string = 'black',
    fontSize: number = 20,
    textAlign: CanvasTextAlign = 'center',
    textBaseLine: CanvasTextBaseline = 'middle',
  ) {
    super(xPos, yPos, width, height);

    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
    this.textBaseLine = textBaseLine;
  }

  /**
   * draw text to screen
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY ofssety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    Scene.writeTextToCanvas(
      ctx,
      this.text,
      this.xPos - offsetX,
      this.yPos - offsetY,
      this.fontSize,
      this.color,
      this.textAlign,
      this.textBaseLine,
    );
  }

  /**
   * Move the text
   *
   * @param xPos new xpos
   * @param yPos new ypos
   */
  public move(xPos: number, yPos: number): void {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}
