import CollideHandler from './CollideHandler.js';
import Game from './Game.js';
import GameInfo from './GameInfo.js';
import KeyboardListener from './KeyboardListener.js';
import Prop from './Prop.js';

export default class Player extends Prop {
  private xVel: number;

  private yVel: number;

  private keyboardListener: KeyboardListener;

  private airborne: boolean;

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
    this.airborne = false
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.xVel = 0;
    if(!this.airborne){
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) this.yVel = -(GameInfo.PLAYER_Y_SPEED);
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) this.xVel += -(GameInfo.PLAYER_X_SPEED);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) this.xVel += GameInfo.PLAYER_X_SPEED;
  }

  /**
   * move the player
   *
   * @param canvas the game canvas
   */
  public move(canvas: HTMLCanvasElement, contacts: number[]): void {
    let xVel;

    if (this.airborne) xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY
    else xVel = this.xVel;

    if (xVel < 0) {
      if (!(this.xPos + xVel < 0 || contacts.includes(CollideHandler.RIGHT_CONTACT))) {
        this.xPos += xVel
      } else {
        this.xVel = 0
      }
    } else {
      if (!(this.xPos + xVel + this.img.width > canvas.width || contacts.includes(CollideHandler.LEFT_CONTACT))) {
        this.xPos += xVel
      } else {
        this.xVel = 0
      }
    }

    const flying = () => {
      this.airborne = true;
      this.yPos += this.yVel;
      this.yVel += GameInfo.GRAVITY_CONSTANT;
    }
    
    if (contacts.includes(CollideHandler.BOTTOM_CONTACT)  || this.yPos + this.yVel < 0) {
      this.airborne = true;
      this.yVel = Math.abs(this.yVel / 4);
    } else {
      flying()
    } if (contacts.includes(CollideHandler.TOP_CONTACT) || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.airborne = false;
      this.yVel = 0;
    } else {
      flying()
    }
  }
}
