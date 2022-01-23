import RectProp from '../../Props/RectProp.js';

export default class CorrectProp extends RectProp {
  /**
   * Constructor of CorrectProp
   *
   * @param xPos X position of CorrectProp
   * @param yPos Y position of CorrectProp
   * @param width Width of CorrectProp
   * @param height Height of CorrectProp
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
  ) {
    super(xPos, yPos, width, height, 'green', 'fill');
  }
}
