import CutScene from '../CutScene.js';
import ImageProp from './ImageProp.js';

export default abstract class NPC extends ImageProp {
  protected activated: boolean;

  public constructor(
    xPos: number, 
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, imageSrc, width, height)
    this.activated = false;
  }
  
  public abstract interact(): CutScene;

  public isActivated(): boolean {
    return this.activated;
  }
}