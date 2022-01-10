import ImageProp from './ImageProp.js';

export default class Teleporter extends ImageProp {
  private destinationScene: string;

  private activated: boolean;

  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    scene: string,
  ) {
    super(xPos, yPos, './assets/img/Portal.png', width, height)

    this.destinationScene = scene;

    this.activated = false
  }

  public getDestinationScene(): string {
    return this.destinationScene;
  }

  public activate(): void {
    this.activated = true
  }

  public isActivated(): boolean {
    return this.activated
  }
}