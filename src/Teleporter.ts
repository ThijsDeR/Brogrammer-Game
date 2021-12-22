import ImageProp from './ImageProp.js';

export default class Teleporter extends ImageProp {
  private destinationScene: string;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    scene: string
  ) {
    super(xPos, yPos, './assets/img/Portal.png', width, height)

    this.destinationScene = scene;
  }

  public getDestinationScene(): string {
    return this.destinationScene;
  }
}