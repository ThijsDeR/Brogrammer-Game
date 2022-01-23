import RectProp from '../../Props/RectProp.js';

export default class DeadProp extends RectProp {
  /**
   * Constructor of DeadProp
   *
   * @param xPos X position of DeadProp
   * @param yPos Y Position of DeadProp
   * @param width Width of DeadProp
   * @param height Height of DeadProp
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
