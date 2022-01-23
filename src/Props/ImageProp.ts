import Game from '../Game.js';
import Prop from './Prop.js';

export default class ImageProp extends Prop {
  protected img: HTMLImageElement;

  protected imgSrc: string;

  /**
   * Initialize ImageProp
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param imgSrc image source
   * @param width width
   * @param height height
   */
  public constructor(
    xPos: number,
    yPos: number,
    imgSrc: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, width, height);

    this.img = Game.loadNewImage(imgSrc, width, height);
    this.imgSrc = imgSrc;
  }

  /**
   * draw the image prop to the canvas
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY offsety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    ctx.drawImage(
      this.img,
      this.xPos - offsetX,
      this.yPos - offsetY,
      this.img.width,
      this.img.height,
    );
  }

  /**
   * Getter for image
   *
   * @returns image
   */
  public getImage(): HTMLImageElement {
    return this.img;
  }

  /**
   * Getter for image source
   *
   * @returns image source
   */
  public getImageSrc(): string {
    return this.imgSrc;
  }
}
