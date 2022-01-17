import CollideHandler from '../../CollideHandler.js';
import TempleRunInfo from './TempleRunInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';

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

    this.xVel = (TempleRunInfo.PLAYER_X_SPEED / 2) * (this.width / 100)
  }
  
  /**
   * processing the input of the player
   */
   public processInput(): void {
    this.yVel = 0
    
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) this.yVel = -(TempleRunInfo.PLAYER_Y_SPEED) * (this.height / 200);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) this.yVel = TempleRunInfo.PLAYER_Y_SPEED * (this.height / 200);
  }

  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {

    this.xPos += this.xVel * (elapsed / 10)

    if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
      this.yVel = 0;
      if (this.yPos + this.yVel < 0) this.yPos = 0
    }
    
    if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.yVel = 0;
      if (this.yPos + this.yVel + this.img.height > canvas.height) this.yPos = canvas.height - this.img.height
    }

    this.yPos += this.yVel * 2 * (elapsed / 10);
  }

  public speed_up(): void {
    this.xVel += 0.0001 * (this.width / 100)
  }

  public die(): void {
    this.dead = true;
  }
  
  public isDead(): boolean {
    return this.dead;
  }
}