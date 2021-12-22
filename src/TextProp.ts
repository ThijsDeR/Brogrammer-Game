export default class TextProp {
  private xPos: number;

  private yPos: number;

  private text: string;

  private fontSize: number;

  private textAlign: CanvasTextAlign;

  private textBaseline: CanvasTextBaseline;

  private color: string;

  public constructor(
    text: string, 
    xPos: number, 
    yPos: number, 
    fontSize: number = 20, 
    textAlign: CanvasTextAlign = 'center', 
    textBaseline: CanvasTextBaseline = 'middle',
    color: string = 'black',
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.text = text;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
    this.color = color
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px Arial`
    ctx.fillStyle = this.color;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline
    ctx.fillText(this.text, this.xPos, this.yPos)
  }
}