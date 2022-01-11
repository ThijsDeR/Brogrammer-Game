import ImageProp from './ImageProp.js';

export default class Platform extends ImageProp {
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, './assets/img/platform.png', width, height)
  }
}