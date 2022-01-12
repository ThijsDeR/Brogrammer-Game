import ImageProp from '../../Props/ImageProp.js';

export default class Cloud extends ImageProp {
  private opacity: number;

  private isDisappearing: boolean;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
    ){
    super(xPos, yPos, './assets/img/cloud.png', width, height)

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
      if (this.opacity >= 0.1) {
        this.opacity -= 0.001 * (elapsed / 20)
      }
    }
  }

  public hasDisappeared(): boolean {
    return this.opacity < 0.1
  }
}