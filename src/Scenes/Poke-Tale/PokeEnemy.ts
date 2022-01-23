import ImageProp from '../../Props/ImageProp.js';

export default class PokeEnemy extends ImageProp {
  /**
   * Constructor of PokeEnemy
   *
   * @param xPos X position of PokeEnemy
   * @param yPos Y position of PokeEnemy
   * @param width Widht of PokeEnemy
   * @param height Height of PokeEnemy
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
