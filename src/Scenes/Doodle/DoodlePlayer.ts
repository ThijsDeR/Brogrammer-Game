import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';

export default class DoodlePlayer extends Player {

  private dead: boolean;

  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height)

    this.dead = false;
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.xVel = 0;

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) this.xVel += -(DoodleLevelInfo.PLAYER_X_SPEED);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) this.xVel += DoodleLevelInfo.PLAYER_X_SPEED;
  }

  /**
  * move the player
  *
  * @param canvas the game canvas
  */
  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {

    this.xPos += this.xVel * (elapsed / 10)

    if (this.xPos < 0) {
      this.xPos = canvas.width - this.img.width
    } else if (this.xPos + this.img.width > canvas.width) {
      this.xPos = 0
    }

    const flying = () => {
      this.airborne = true;
      this.yPos += this.yVel * (elapsed / 10);
      this.yVel += DoodleLevelInfo.GRAVITY_CONSTANT * (elapsed / 10);
    }

    if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
      this.airborne = false;
      this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED);

      // sound when hitting the clouds
      let jumpSound = new Audio('./assets/img/Sound/JumpCloud.wav');
      jumpSound.volume = 0.3
      jumpSound.play();
    } else {
      flying()
    }

    if (this.yPos + this.yVel + this.img.height > canvas.height) {
      this.dead = true
    }
  }

  public die(): void {
    this.dead = true;
  }

  public isDead(): boolean {
    return this.dead;
  }
}
