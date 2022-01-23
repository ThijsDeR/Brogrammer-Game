import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';
import DoodleInfo from './Info/DoodleInfo.js';

export default class Cloud extends ImageProp {
  private opacity: number;

  private isDisappearing: boolean;

  /**
   * Initialize Cloud
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height width
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, `${GameInfo.IMG_PATH}cloud.png`, width, height);

    this.opacity = 1;
    this.isDisappearing = false;
  }

  /**
   * draw the cloud to the canvas
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY offsety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    ctx.globalAlpha = this.opacity;
    super.draw(ctx, offsetX, offsetY);
    ctx.globalAlpha = 1;
  }

  /**
   * make the cloud dissapear when touched
   */
  public disappear(): void {
    this.isDisappearing = true;
  }

  /**
   * remove the cloud
   *
   * @param elapsed the time elapsed since last frame
   */
  public makeDisappear(elapsed: number): void {
    if (this.isDisappearing) {
      if (this.opacity >= 0.1) {
        this.opacity -= DoodleInfo.CLOUD_DISSAPEAR * (elapsed * GameInfo.ELAPSED_PENALTY);
      }
    }
  }

  /**
   * check if cloud has dissapeared
   *
   * @returns boolean
   */
  public hasDisappeared(): boolean {
    return this.opacity < 0.1;
  }
}
