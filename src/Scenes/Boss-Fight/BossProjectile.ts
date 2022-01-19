import RectProp from "../../Props/RectProp.js";
import Game from "../../Game.js"
import BossInfo from "./Info/BossInfo.js";
import Scene from "../../Scene.js";
import GameInfo from "../../GameInfo.js";

export default class BossProjectile {
  private rectProp: RectProp;

  private text: string;

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

    this.rectProp = new RectProp(xPos, yPos, width, height, 'green', 'fill')
    this.text = BossInfo.BOSS_TEXTS[Game.randomNumber(0, BossInfo.BOSS_TEXTS.length - 1)]

    this.xVelocity = xVelocity * 4;
    this.yVelocity = yVelocity * 4; 
  }

  public move(elapsed: number): void {
    this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)
    this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY)

    this.rectProp.setXPos(this.xPos)
    this.rectProp.setYPos(this.yPos)
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.rectProp.draw(ctx)

    Scene.writeTextToCanvas(
      ctx,
      this.text,
      this.xPos + (this.width / 2),
      this.yPos + (this.height / 2),
      this.height / 5,
      'white',
      'center',
      'middle',
      this.width
    )
  }

  public getRectProp(): RectProp {
    return this.rectProp
  }
}