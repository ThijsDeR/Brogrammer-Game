import Cloud from "./Cloud.js";

export default class CloudPlatform extends Cloud {
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ){
    super(xPos, yPos, width, height)
  }
}