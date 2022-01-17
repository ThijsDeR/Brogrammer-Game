import CollideHandler from '../../CollideHandler.js';
import GameInfo from '../../GameInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';
import DoodleLevelInfo from './DoodleLevelInfo.js';

export default class DoodlePlayer extends Player {
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
    this.xVel = 0;

    if(!this.airborne){
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED) * (this.height / 100);
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) this.xVel = -(DoodleLevelInfo.PLAYER_X_SPEED) * (this.width / 100);
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) this.xVel = DoodleLevelInfo.PLAYER_X_SPEED * (this.width / 100);

    if (this.xVel < 0) this.direction = 'left';
    else if (this.xVel > 0) this.direction = 'right';
  }

  /**
  * move the player
  *
  * @param canvas the game canvas
  */
  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number, onPlatform: boolean): void {

    this.xPos += this.xVel * (elapsed / 10)

    if (this.xPos < 0) {
      this.xPos = canvas.width - this.img.width
    } else if (this.xPos + this.img.width > canvas.width) {
      this.xPos = 0
    }

    const flying = () => {
      this.airborne = true;
      this.yPos += this.yVel * (elapsed / 10);
      this.yVel += DoodleLevelInfo.GRAVITY_CONSTANT * (elapsed / 10) * (this.height / 100);
    }
    if ((contacts.includes(CollideHandler.TOP_CONTACT) && this.yVel > 0)) {
      if (onPlatform) {
        this.airborne = false
        this.yVel = 0
      } else {
        this.airborne = true;
        this.yVel = -(DoodleLevelInfo.PLAYER_Y_SPEED) * (this.height / 100);

        // sound when hitting the clouds
        const jumpSound = new Audio(GameInfo.SOUND_PATH + 'JumpCloud.wav');
        jumpSound.volume = 0.3
        jumpSound.play();
      }
      
    } else {
      flying()
    }
  }

  public die(): void {
    this.dead = true;
  }

  public isDead(): boolean {
    return this.dead;
  }
}
