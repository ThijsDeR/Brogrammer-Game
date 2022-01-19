import GameInfo from "../../GameInfo.js";
import ImageProp from "../../Props/ImageProp.js";

export default class PlayerProjectile {
  private image: ImageProp

  private xPos: number;

  private yPos: number;

  private width: number;

  private height: number;

  private xVelocity: number;

  private yVelocity: number;

  public constructor(
    xPos: number, 
    yPos: number,
    width: number,
    height: number,
    xVelocity: number,
    yVelocity: number,
  ) {
    this.xPos = xPos
    this.yPos = yPos

    this.width = width
    this.height = height

    this.image = new ImageProp(xPos, yPos, GameInfo.IMG_PATH + 'Temple-Run/block.png',width, height)

    this.xVelocity = xVelocity * 4;
    this.yVelocity = yVelocity * 4; 
  }

  public move(elapsed: number): void {
    this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)
    this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)

    this.image.setXPos(this.xPos)
    this.image.setYPos(this.yPos)
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.image.draw(ctx)
  }

  public checkOutOfCanvas(canvas: HTMLCanvasElement): boolean {
    if (
      this.xPos > canvas.width 
      || this.xPos < 0 - this.width
      || this.yPos > canvas.height
      || this.yPos < 0 - this.height
    ) return true
    return false
  }

  public getImage(): ImageProp {
    return this.image
  }
}