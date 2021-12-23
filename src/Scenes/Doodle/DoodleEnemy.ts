import ImageProp from '../../Props/ImageProp.js';

export default class DoodleEnemy extends ImageProp {

  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined
    ){
    super(xPos, yPos, './assets/img/Slime.png', width, height)

  }
}
