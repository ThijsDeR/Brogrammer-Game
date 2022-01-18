import GameInfo from '../GameInfo.js';
import ImageProp from './ImageProp.js';

export default class Platform extends ImageProp {
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, GameInfo.IMG_PATH + 'platform.png', width, height)
  }
}