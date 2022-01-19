import ImageProp from '../../Props/ImageProp.js';

export default class PokeEnemy extends ImageProp {

  public constructor(
    xPos: number,
    yPos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined
    ){
    super(xPos, yPos, './assets/img/PokeEnemy.png', width, height)

  }
}
