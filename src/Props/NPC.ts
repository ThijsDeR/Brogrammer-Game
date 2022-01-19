import CutScene from '../CutScene.js';
import ImageProp from './ImageProp.js';

export default abstract class NPC extends ImageProp {
  protected activated: boolean;

  protected talkingDelay: number;

  public constructor(
    xPos: number, 
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, imageSrc, width, height)

    this.activated = false;
    this.talkingDelay = 1000
  }
  
  public abstract interact(): CutScene;

  public removeDelay(elapsed: number): void {
    this.talkingDelay -= elapsed
  }

  public isActivated(): boolean {
    return this.activated;
  }
}