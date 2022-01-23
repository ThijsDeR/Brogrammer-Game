import CollideHandler from './CollideHandler.js';
import GameInfo from './GameInfo.js';
import ImageProp from './Props/ImageProp.js';
import KeyboardListener from './KeyboardListener.js';

export default class Player extends ImageProp {
  protected xVel: number;

  protected yVel: number;

  protected keyboardListener: KeyboardListener;

  protected airborne: boolean;

  protected direction: 'left' | 'right';

  /**
   * Initializing the player
   *
   * @param xPos the x position of the player
   * @param yPos the y position of the player
   * @param imageSrc the source of the image
   * @param width the width of the player
   * @param height the height of the player
   */
  public constructor(
    xPos: number,
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, imageSrc, width, height);
    this.keyboardListener = new KeyboardListener();

    this.xVel = 0;
    this.yVel = 0;
    this.airborne = false;
    this.direction = 'right';
  }

  /**
   * @param ctx CanvasRenderingContext
   * @param offsetX The X offset of player
   * @param offsetY The Y offset of player
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    if (this.direction === 'left') {
      ctx.save();
      ctx.translate(this.xPos + this.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, this.yPos, this.width, this.height);
      ctx.restore();
    } else if (this.direction === 'right') {
      ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
    }
  }

  /**
   * processing the input of the player
   */
  public processInput(): void {
    this.xVel = 0;

    if (!this.airborne) {
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
          || this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
        this.yVel = -(GameInfo.PLAYER_Y_SPEED) * (this.height / 100);
      }
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)
        || this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.xVel = -(GameInfo.PLAYER_X_SPEED) * (this.width / 100);
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)
         || this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.xVel = GameInfo.PLAYER_X_SPEED * (this.width / 100);
    }

    if (this.xVel < 0) this.direction = 'left';
    else if (this.xVel > 0) this.direction = 'right';
  }

  /**
   * move the player
   *
   * @param canvas The game canvas
   * @param contacts Array that contains the collision of the player
   * @param elapsed The time that has passed
   * @param onPlatform 'True' if the player is on a platform
   *                   'False' if the player is not on a platform
   */
  public move(
    canvas: HTMLCanvasElement,
    contacts: number[],
    elapsed: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPlatform?: boolean,
  ): void {
    let xVel: number;

    // Give the player a speed penalty when airborne
    if (this.airborne) xVel = this.xVel / GameInfo.PLAYER_AIRBORNE_X_SPEED_PENTALTY;
    else xVel = this.xVel;

    // Checks if the right side of player collides with something.
    if (xVel < 0) {
      if (!(this.xPos + xVel < 0 || contacts.includes(CollideHandler.RIGHT_CONTACT))) {
        this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
      } else {
        this.xVel = 0;
      }
    } else if (!(this.xPos + xVel + this.img.width > canvas.width
      || contacts.includes(CollideHandler.LEFT_CONTACT))) {
      this.xPos += xVel * (elapsed * GameInfo.ELAPSED_PENALTY);
    } else {
      this.xVel = 0;
    }

    const flying = () => {
      this.airborne = true;
      this.yPos += this.yVel * 2 * (elapsed * GameInfo.ELAPSED_PENALTY);
      this.yVel += GameInfo.GRAVITY_CONSTANT * 2
      * (elapsed * GameInfo.ELAPSED_PENALTY) * (this.height / 100);
    };
    let shouldBeFlying = true;
    if (contacts.includes(CollideHandler.BOTTOM_CONTACT) || this.yPos + this.yVel < 0) {
      this.airborne = true;
      this.yVel = Math.abs(this.yVel / 4);
      shouldBeFlying = false;
      if (this.yPos + this.yVel < 0) this.yPos = 0;
    }

    if (contacts.includes(CollideHandler.TOP_CONTACT)
    || this.yPos + this.yVel + this.img.height > canvas.height) {
      this.airborne = false;
      this.yVel = 0;
      shouldBeFlying = false;
      if (this.yPos + this.yVel + this.img.height > canvas.height) {
        this.yPos = canvas.height - this.img.height;
      }
    }

    if (shouldBeFlying) flying();
  }

  /**
   * Method that calls a pausing scene after pressing the E key.
   *
   *@returns 'True' if the E key is presssed down
   *         'False' if the key is not pressed
   */
  public isInteracting(): boolean {
    return this.keyboardListener.isKeyDown(KeyboardListener.KEY_E);
  }

  /**
   * Method that calls a pausing scene after pressing the ESC key.
   *
   *@returns 'True' if the ESC key is presssed down
   *         'False' if the key is not pressed
   */
  public isPausing(): boolean {
    return this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC);
  }
}
