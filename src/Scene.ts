import UserData from './UserData.js';

export default abstract class Scene {
  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;

  protected userData: UserData;

  /**
   * l
   *
   * @param canvas l
   * @param userData
   */
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.userData = userData;
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

  /**
   * @param ctx
   * @param text
   * @param xPos
   * @param yPos
   * @param fontSize
   * @param color
   * @param textAlign
   * @param textBaseline
   * @param maxWidth
   */
  public static writeTextToCanvas(
    ctx: CanvasRenderingContext2D,
    text: string,
    xPos: number,
    yPos: number,
    fontSize: number = 20,
    color: string = 'white',
    textAlign: CanvasTextAlign = 'center',
    textBaseline: CanvasTextBaseline = 'middle',
    maxWidth: number = 10000,
  ) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const words = text.split(' ');
    let line = '';
    const yPositions: number[] = [];
    const lines = [];
    for (let i = 0; i < words.length; i++) {
      const tempLine = `${line + words[i]} `;
      const metrics = ctx.measureText(tempLine);
      const tempWidth = metrics.width;
      if (tempWidth > maxWidth && i > 0) {
        lines.push(line);
        // ctx.fillText(line, xPos, yPos);
        line = `${words[i]} `;
        // yPos += fontSize;
      } else {
        line = tempLine;
      }
    }
    lines.push(line);

    const amount = lines.length;
    if (amount % 2 === 0) {
      for (let i = amount / 2; i > 0; i--) {
        yPositions.push(yPos - (fontSize * i));
      }
      for (let i = 0; i < (amount / 2); i++) {
        yPositions.push(yPos + (fontSize * i));
      }
    } else {
      for (let i = (amount - 1) / 2; i > 0; i--) {
        yPositions.push(yPos - (fontSize * i));
      }
      yPositions.push(yPos);
      for (let i = 0; i < (amount - 1) / 2; i++) {
        yPositions.push(yPos + (fontSize * (i + 1)));
      }
    }
    lines.forEach((line, lineIndex) => {
      ctx.fillText(line, xPos, yPositions[lineIndex]);
    });
  }
}
