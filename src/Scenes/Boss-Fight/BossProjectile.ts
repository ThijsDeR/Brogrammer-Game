import RectProp from "../../Props/RectProp.js";
import Game from "../../Game.js"
import BossInfo from "./Info/BossInfo.js";
import Scene from "../../Scene.js";
import GameInfo from "../../GameInfo.js";
import ImageProp from "../../Props/ImageProp.js";

export default class BossProjectile {
  private imageProp: ImageProp;

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

    this.imageProp = new ImageProp(xPos, yPos, BossInfo.PROJECTILE_IMAGE_SRC[Game.randomNumber(0, BossInfo.PROJECTILE_IMAGE_SRC.length - 1)] ,width, height)

    this.xVelocity = xVelocity * 4;
    this.yVelocity = yVelocity * 4; 
  }

  public move(elapsed: number): void {
    this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)
    this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)

    this.imageProp.setXPos(this.xPos)
    this.imageProp.setYPos(this.yPos)
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.imageProp.draw(ctx)
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

  public getImageProp(): ImageProp {
    return this.imageProp
  }
}