import GameInfo from '../../GameInfo.js';
import Projectile from './Projectile.js';

export default class PlayerProjectile extends Projectile {
  /**
   * Initialize PlayerProjectile
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param xVelocity xvelocity
   * @param yVelocity yvelocity
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    xVelocity: number,
    yVelocity: number,
  ) {
    super(xPos, yPos, width, height, `${GameInfo.IMG_PATH}Temple-Run/block.png`, xVelocity, yVelocity);
  }
}
