import Game from './Game.js';
import Prop from './Prop.js';

export default class ImageProp extends Prop {
  protected img: HTMLImageElement;

  public constructor(
    xPos: number, 
    yPos: number, 
    imgSrc: string, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, width, height)
    this.img = Game.loadNewImage(imgSrc, width, height);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos, this.img.width, this.img.height);
  }
}