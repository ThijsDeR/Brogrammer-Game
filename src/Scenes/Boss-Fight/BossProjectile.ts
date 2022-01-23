import Game from '../../Game.js';
import BossInfo from './Info/BossInfo.js';
import Projectile from './Projectile.js';

export default class BossProjectile extends Projectile {
  /**
   * Initialize BossProjectile
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
    super(
      xPos,
      yPos,
      width,
      height,
      BossInfo.PROJECTILE_IMAGE_SRC[Game.randomNumber(0, BossInfo.PROJECTILE_IMAGE_SRC.length - 1)],
      xVelocity,
      yVelocity,
    );
  }
}
