import GameInfo from '../../GameInfo';
import ImageProp from '../../Props/ImageProp.js';

export default abstract class Projectile extends ImageProp {
  private xVelocity: number;

  private yVelocity: number;

  /**
   * Initialize PlayerProjectile
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param imageSrc image source
   * @param xVelocity xvelocity
   * @param yVelocity yvelocity
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    imageSrc: string,
    xVelocity: number,
    yVelocity: number,
  ) {
    super(xPos, yPos, imageSrc, width, height);

    this.xVelocity = xVelocity * 4;
    this.yVelocity = yVelocity * 4;
  }

  /**
   * Move the projectile
   *
   * @param elapsed time elapsed since last frame
   */
  public move(elapsed: number): void {
    this.xPos += this.xVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);
    this.yPos += this.yVelocity * (elapsed * GameInfo.ELAPSED_PENALTY);

    this.setXPos(this.xPos);
    this.setYPos(this.yPos);
  }

  /**
   * Check if projectile is out of canvas
   *
   * @param canvas the game canvas
   * @returns boolean
   */
  public checkOutOfCanvas(canvas: HTMLCanvasElement): boolean {
    if (
      this.xPos > canvas.width
      || this.xPos < 0 - this.width
      || this.yPos > canvas.height
      || this.yPos < 0 - this.height
    ) return true;
    return false;
  }
}
