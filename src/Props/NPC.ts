import CutScene from '../CutScene.js';
import ImageProp from './ImageProp.js';

export default abstract class NPC extends ImageProp {
  protected activated: boolean;

  protected talkingDelay: number;

  /**
   * Initialize NPC
   *
   * @param xPos xpos
   * @param yPos ypos
   * @param imageSrc image sourc
   * @param width width
   * @param height height
   */
  public constructor(
    xPos: number,
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, imageSrc, width, height);

    this.activated = false;
    this.talkingDelay = 1000;
  }

  /**
   * interact function
   */
  public abstract interact(): CutScene;

  /**
   * removing the delay between talking
   *
   * @param elapsed the time elapsed since next frame
   */
  public removeDelay(elapsed: number): void {
    this.talkingDelay -= elapsed;
  }

  /**
   * Getter for activated
   *
   * @returns boolean
   */
  public isActivated(): boolean {
    return this.activated;
  }
}
