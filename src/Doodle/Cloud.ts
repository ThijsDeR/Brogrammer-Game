import Prop from '../Prop.js';

export default class Cloud extends Prop {
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
    ){
    super(xPos, yPos, './assets/img/cloud.png', width, height)
  }
}