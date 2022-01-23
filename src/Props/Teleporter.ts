import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';

export default class Teleporter extends ImageProp {
  private destinationScene: string;

  private activated: boolean;

  /**
   * Initialize Teleporter
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param width width
   * @param height height
   * @param scene the to teleport to scene
   */
  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    scene: string,
  ) {
    super(xPos, yPos, `${GameInfo.IMG_PATH}Portal.png`, width, height);

    this.destinationScene = scene;

    this.activated = false;
  }

  /**
   * Getter for scene
   *
   * @returns scene
   */
  public getDestinationScene(): string {
    return this.destinationScene;
  }

  /**
   * Activate the portal
   */
  public activate(): void {
    this.activated = true;
  }

  /**
   * Check if teleporter is activated
   *
   * @returns boolean
   */
  public isActivated(): boolean {
    return this.activated;
  }
}
