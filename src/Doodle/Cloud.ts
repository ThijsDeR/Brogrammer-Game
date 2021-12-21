import Prop from '../Prop.js';

export default class Cloud extends Prop {
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
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = this.opacity
    ctx.drawImage(this.img, this.xPos, this.yPos, this.img.width, this.img.height);
    ctx.globalAlpha = 1
  }
  public disappear(): void {
    if (!this.isDisappearing) {
      this.isDisappearing = true
      this.makeDisappear()
    }
  }

  private makeDisappear(): void {
    setTimeout(() => {
      if (this.opacity >= 0.1) {
        this.opacity -= 0.01
        this.makeDisappear()
      }
    }, 50)
  }

  public hasDisappeared(): boolean {
    return this.opacity < 0.1
  }
}