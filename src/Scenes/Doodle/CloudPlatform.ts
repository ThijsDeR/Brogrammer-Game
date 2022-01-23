import Cloud from './Cloud.js';

export default class CloudPlatform extends Cloud {
  /**
   * Initialize CloudPlatform
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
    super(xPos, yPos, width, height);
  }
}
