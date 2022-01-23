import RectProp from '../../Props/RectProp.js';

export default class FallLine extends RectProp {
  /**
   * Initialize FallLine
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param color color
   * @param style fill or stroke
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    style: 'fill' | 'stroke',
  ) {
    super(xPos, yPos, width, height, color, style);
  }
}
