import CollideHandler from './CollideHandler.js';
import Game from './Game.js';
import KeyboardListener from './KeyboardListener.js';
import Prop from './Prop.js';

export default class Player extends Prop {
  private xVel: number;

  private yVel: number;

  private keyboardListener: KeyboardListener;

  private airBorne: boolean;

  /**
   * Initializing the player
   *
   * @param xPos the x position of the player
   * @param yPos the y position of the player
   */
  public constructor(
    xPos: number, 
    yPos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, './assets/img/Dood.jpg', width, height);
    this.keyboardListener = new KeyboardListener();

    this.xVel = 0;
    this.yVel = 0;
    this.airBorne = false
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.xVel = 0;
    if(!this.airBorne){
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) this.yVel = -(Game.PLAYER_Y_SPEED);
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) this.xVel += -4;
    else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) this.xVel += 4;
    else this.xVel = 0;
  }

  /**
   * move the player
   *
   * @param canvas the game canvas
   */
  public move(canvas: HTMLCanvasElement, contact: number): void {
    if (!(this.xPos + this.xVel < 0 || this.xPos + this.xVel + this.img.width > canvas.width)) {
      this.xPos += this.xVel;
    } else {
      this.xVel = 0;
    } 

    
    if (contact === CollideHandler.TOP_CONTACT || this.yPos + this.yVel < 0) {
      this.airBorne = true;
      this.yVel = 0;
    } else if (contact === CollideHandler.BOTTOM_CONTACT || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.airBorne = false;
    this.yVel = 0;
    } else {
      this.airBorne = true;
      this.yPos += this.yVel;
      this.yVel += 0.098;
    }
  }



  /**
   * Sets the xPos
   *
   * @param xPos xPos
   */
  public setXPos(xPos: number): void {
    this.xPos = xPos;
  }

  /**
   * Sets the yPos
   *
   * @param yPos yPos
   */
  public setYPos(yPos: number): void {
    this.yPos = yPos;
  }
}
