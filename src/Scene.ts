import UserData from './UserData.js';

export default abstract class Scene {
  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;
  
  protected userData: UserData
  /**
   * l
   *
   * @param canvas l
   */
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.userData = userData
  }

  /**
   * drawing the scene
   */
  public abstract draw(): void;

  /**
   * processing the input of the scene
   */
  public abstract processInput(): void;

  /**
   * update the scene
   *
   */
  public abstract update(elapsed: number): Scene;

  public static writeTextToCanvas(
    ctx: CanvasRenderingContext2D,
    text: string, 
    xPos: number, 
    yPos: number, 
    fontSize: number = 20, 
    textAlign: CanvasTextAlign = 'center', 
    textBaseline: CanvasTextBaseline = 'middle',
    color: string = 'black',
    maxWidth: number = 10000,
  ) {
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const words = text.split(' ');
    let line = '';

    for(let i = 0; i < words.length; i++) {
      const tempLine = line + words[i] + ' ';
      const metrics = ctx.measureText(tempLine);
      const tempWidth = metrics.width;
      if (tempWidth > maxWidth && i > 0) {
        ctx.fillText(line, xPos, yPos);
        line = words[i] + ' ';
        yPos += fontSize;
      }
      else {
        line = tempLine;
      }
    }
    ctx.fillText(line, xPos, yPos)
  }
}
