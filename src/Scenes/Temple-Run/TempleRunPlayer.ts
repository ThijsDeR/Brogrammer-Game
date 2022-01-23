import CollideHandler from '../../CollideHandler.js';
import TempleRunInfo from './Info/TempleRunInfo.js';
import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import UserData from '../../UserData.js';
import GameInfo from '../../GameInfo.js';

export default class TempleRunPlayer extends Player {
  private dead: boolean;

  /**
   * Constructor of TempleRunPlayer
   *
   * @param xPos The x position of the player
   * @param yPos The y position of the player
   * @param width The width of the player
   * @param height The height of the player
   * @param userData The userdata of the player
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    userData: UserData,
  ) {
    super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
    this.dead = false;

    this.xVel = (TempleRunInfo.PLAYER_X_SPEED) * (this.width / 100);
  }

  /**
   * Method that draws stuff
   *
   * @param ctx The rendering context of the canvas
   * @param offsetX The x offset of the image
   * @param offsetY The y offset of the image
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    if (this.direction === 'left') {
      ctx.save();
      ctx.translate(this.xPos + this.width - offsetX, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, this.yPos - offsetY, this.width, this.height);
      ctx.restore();
    } else if (this.direction === 'right') {
      ctx.drawImage(this.img, this.xPos - offsetX, this.yPos - offsetY, this.width, this.height);
    }
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.yVel = 0;

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.yVel = -(TempleRunInfo.PLAYER_Y_SPEED) * (this.height / 200);
    }
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
      || this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.yVel = TempleRunInfo.PLAYER_Y_SPEED * (this.height / 200);
    }
  }

  /**
   * Method that moves the player
   *
   * @param canvas The game field
   * @param contacts Collision of the player
   * @param elapsed Time elapsed
   */
  public move(canvas: HTMLCanvasElement, contacts: number[], elapsed: number): void {
    this.xPos += this.xVel * (elapsed * GameInfo.ELAPSED_PENALTY);

    if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
      this.yVel = 0;
      if (this.yPos + this.yVel < 0) this.yPos = 0;
    }

    if (contacts.includes(CollideHandler.TOP_CONTACT)
    || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.yVel = 0;
      if (this.yPos + this.yVel + this.img.height > canvas.height) {
        this.yPos = canvas.height - this.img.height;
      }
    }

    this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
  }

  /**
   * Method that speeds the player up
   */
  public speedUp(): void {
    this.xVel += TempleRunInfo.PLAYER_SPEED_UP * (this.width / 100);
  }

  /**
   * Method that kills the player
   */
  public die(): void {
    this.dead = true;
  }

  /**
   * Method that checks if the player is dead.
   *
   * @returns 'True' if the player is dead
   *          'False' if the player is alive
   */
  public isDead(): boolean {
    return this.dead;
  }
}
