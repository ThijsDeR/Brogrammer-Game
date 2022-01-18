import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';

export default class Ladder extends ImageProp {
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
  ) {
    super(xPos, yPos, GameInfo.IMG_PATH + 'son.png', width, height)
  }
}