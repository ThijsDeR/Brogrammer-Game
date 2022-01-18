import GameInfo from '../../GameInfo.js';
import ImageProp from '../../Props/ImageProp.js';

export default class DoodleEnemy extends ImageProp {

  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined
    ){
    super(xPos, yPos, GameInfo.IMG_PATH + 'Slime.png', width, height)

  }
}
