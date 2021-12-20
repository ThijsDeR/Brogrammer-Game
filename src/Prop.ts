import Game from './Game.js';

export default class Prop {
  protected xPos: number;

  protected yPos: number;

  protected img: HTMLImageElement;

  /**
   * Initializing the prop
   *
   * @param xPos the x position of the prop
   * @param yPos the y position of the prop
   * @param imgSrc the source string of the prop image
   */
  public constructor(
    xPos: number, 
    yPos: number, 
    imgSrc: string, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.img = Game.loadNewImage(imgSrc, width, height);
  }

  /**
   * Draw the prop
   *
   * @param ctx the context of the game canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {

    ctx.drawImage(this.img, this.xPos, this.yPos, this.img.width, this.img.height);
  }

  /**
   * Get the min xPos of prop
   *
   * @returns xPos
   */
  public getMinXPos(): number {
    return this.xPos;
  }

  /**
   * Get the max xPos of prop
   *
   * @returns xPos
   */
  public getMaxXPos(): number {
    return this.xPos + this.img.width;
  }

  /**
   * Get the min yPos of prop
   *
   * @returns yPos
   */
  public getMinYPos(): number {
    return this.yPos;
  }

  /**
   * Get the max yPos of prop
   *
   * @returns yPos
   */
  public getMaxYPos(): number {
    return this.yPos + this.img.height;
  }

  public getWidth(): number {
    return this.img.width;
  }

  public getHeight(): number { 
    return this.img.height;
  }

  /**
   * Sets the xPos
   *
   * @param xPos xPos
   */
   public setXPos(xPos: number): void {
    this.xPos = xPos;
  }

  /**
   * Sets the yPos
   *
   * @param yPos yPos
   */
  public setYPos(yPos: number): void {
    this.yPos = yPos;
  }
}
