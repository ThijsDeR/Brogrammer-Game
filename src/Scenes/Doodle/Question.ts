import Prop from '../../Props/Prop.js';
import RectProp from '../../Props/RectProp.js';

export default class Question extends RectProp {

  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    color: string,
    style: 'fill' | 'stroke'
  ) {
    super(xPos, yPos, width, height, color, style);
  }
}
