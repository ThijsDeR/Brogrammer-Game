import RectProp from "../../Props/RectProp.js";
import Game from "../../Game.js"
import BossInfo from "./Info/BossInfo.js";
import Scene from "../../Scene.js";
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

  public getImage(): ImageProp {
    return this.image
  }
}