import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';

export default class Coin extends ImageProp {
  private points: number;

  /**
   * Initialize Coin
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, `${GameInfo.IMG_PATH}coin.png`, width, height);
    this.points = 1;
  }

  /**
   * Getter for coin points
   *
   * @returns points
   */
  public getPoints(): number {
    return this.points;
  }
}
