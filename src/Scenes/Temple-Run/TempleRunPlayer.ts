import CollideHandler from '../../CollideHandler.js';
import TempleRunInfo from './Info/TempleRunInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';
import GameInfo from '../../GameInfo.js';

export default class TempleRunPlayer extends Player {
  private dead: boolean;
  
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    userData: UserData
  ) {
    super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height)
    this.dead = false;

    this.xVel = (TempleRunInfo.PLAYER_X_SPEED) * (this.width / 100)
  }
  
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    if (this.direction === 'left') {
      ctx.save()
      ctx.translate(this.xPos + this.width - offsetX, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(this.img, 0, this.yPos - offsetY, this.width, this.height)
      ctx.restore()
    } else if (this.direction === 'right') {
      ctx.drawImage(this.img, this.xPos - offsetX, this.yPos - offsetY, this.width, this.height)
    } 
  }

  /**
   * processing the input of the player
   */
   public processInput(): void {
    this.yVel = 0
    
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)  || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) this.yVel = -(TempleRunInfo.PLAYER_Y_SPEED) * (this.height / 200);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)  || this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) this.yVel = TempleRunInfo.PLAYER_Y_SPEED * (this.height / 200);
  }

  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {

    this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY)

    if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
      this.yVel = 0;
      if (this.yPos + this.yVel < 0) this.yPos = 0
    }
    
    if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.yVel = 0;
      if (this.yPos + this.yVel + this.img.height > canvas.height) this.yPos = canvas.height - this.img.height
    }

    this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
  }

  public speed_up(): void {
    this.xVel += TempleRunInfo.PLAYER_SPEED_UP * (this.width / 100)
  }

  public die(): void {
    this.dead = true;
  }
  
  public isDead(): boolean {
    return this.dead;
  }
}