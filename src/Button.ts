import Game from './Game.js';
import RectProp from './RectProp.js';

export default class Button extends RectProp{
  private text: string;

  private fontSize: number;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number,
    height: number,
    color: string,
    text: string,
    fontSize: number
  ) {
    super(xPos, yPos, width, height, color)

    this.text = text;
    this.fontSize = fontSize;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx)
    ctx.fillStyle = 'black'
    ctx.font = `${this.fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const metrics = ctx.measureText(this.text)
    let xPos = this.xPos + (this.width / 2)
    let yPos = this.yPos + (this.height / 2)
    // const words = this.text.split(' ')

    // let line = ''
    // for(let i = 0; i < words.length; i++) {
    //   console.log(line)
    //   const testLine = line + words[i] + ' '
    //   const metrics = ctx.measureText(testLine)
    //   if (metrics.width > this.width && i > 0) {
    //     ctx.fillText(line, xPos, yPos)
    //     line = words[i] + ' '
    //     yPos += this.fontSize * 1.5
    //   } else {
    //     line = testLine
    //   }
    // }
    ctx.fillText(this.text, xPos, yPos)
  }
}