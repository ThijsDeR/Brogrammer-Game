import RectProp from '../../Props/RectProp.js';

export default class DeadProp extends RectProp {
  /**
   * @param xPos
   * @param yPos
   * @param width
   * @param height
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
  ) {
    super(xPos, yPos, width, height, 'red', 'fill');
  }
}
