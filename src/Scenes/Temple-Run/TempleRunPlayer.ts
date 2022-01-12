import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';

export default class TempleRunPlayer extends Player {
  private dead: boolean;
  
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height)
    this.dead = false;

    this.xVel = GameInfo.PLAYER_X_SPEED / 2
  }
  
  /**
   * processing the input of the player
   */
   public processInput(): void {
    this.yVel = 0
    
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) this.yVel = -(GameInfo.PLAYER_X_SPEED);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) this.yVel = GameInfo.PLAYER_X_SPEED;
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
    this.xVel += 0.0001
  }

  public die(): void {
    this.dead = true;
  }
  
  public isDead(): boolean {
    return this.dead;
  }
}