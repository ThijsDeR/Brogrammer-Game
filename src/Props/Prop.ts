import Game from '../Game.js';

export default abstract class Prop {
  protected xPos: number;

  protected yPos: number;

  protected width: number;

  protected height: number;

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
    width: number,
    height: number,
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }

  /**
   * Draw the prop
   *
   * @param ctx the context of the game canvas
   */
  public abstract draw(ctx: CanvasRenderingContext2D): void;

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
    return this.xPos + this.width;
  }

  /**
   * Get the max yPos of prop
   *
   * @returns yPos
   */
  public getMaxYPos(): number {
    return this.yPos + this.height;
  }

  /**
   * Get the min yPos of prop
   *
   * @returns yPos
   */
  public getMinYPos(): number {
    return this.yPos;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number { 
    return this.height;
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

  /**
   * get the xpos
   * 
   * @param xPos xPos
   */
  public getXPos(): number {
    return this.xPos
  }

  /**
   * get the ypos
   * 
   * @param yPos yPos
   */
   public getYPos(): number {
    return this.yPos
  }

}
