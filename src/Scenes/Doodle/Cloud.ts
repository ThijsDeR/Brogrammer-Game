import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
import DoodleInfo from './Info/DoodleInfo.js';

export default class Cloud extends ImageProp {
  private opacity: number;

  private isDisappearing: boolean;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    ){
    super(xPos, yPos, GameInfo.IMG_PATH + 'cloud.png', width, height)

    this.opacity = 1;
    this.isDisappearing = false;
  }
  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    ctx.globalAlpha = this.opacity
    super.draw(ctx, offsetX, offsetY)
    ctx.globalAlpha = 1
  }
  public disappear(): void {
    this.isDisappearing = true
  }

  public makeDisappear(elapsed: number): void {
    if (this.isDisappearing) {
      console.log(this.opacity)
      if (this.opacity >= 0.1) {
        this.opacity -= DoodleInfo.CLOUD_DISSAPEAR * (elapsed / GameInfo.ELAPSED_PENALTY)
      }
    }
  }

  public hasDisappeared(): boolean {
    return this.opacity < 0.1
  }
}