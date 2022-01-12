import RectProp from "../../Props/RectProp.js";

export default class CorrectProp extends RectProp {
  public constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
  ) {
    super(xPos, yPos, width, height, 'green', 'fill')
  }
}