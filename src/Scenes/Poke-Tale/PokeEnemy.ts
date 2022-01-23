import ImageProp from '../../Props/ImageProp.js';

export default class PokeEnemy extends ImageProp {
  /**
   * @param xPos
   * @param yPos
   * @param width
   * @param height
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, './assets/img/PokeEnemy.png', width, height);
  }
}
