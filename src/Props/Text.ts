import Scene from "../Scene.js";
import Prop from "./Prop.js";

export default class Text extends Prop {
  private text: string;

  private color: string;

  private fontSize: number;

  private textAlign: CanvasTextAlign;

  private textBaseLine: CanvasTextBaseline;

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
    super(xPos, yPos, width, height)

    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
    this.textBaseLine = textBaseLine;
  }

  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    Scene.writeTextToCanvas(ctx, this.text, this.xPos - offsetX, this.yPos - offsetY, this.fontSize, this.color, this.textAlign, this.textBaseLine)
  }

  public move(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}