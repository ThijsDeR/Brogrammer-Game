import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import Prop from '../../Props/Prop.js';
import UserData from '../../UserData.js';

export default class HubPlayer extends Player {

  private props: Prop[];
  
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    userData: UserData,
  ) {
    console.log(`${userData.getCurrentSkin().src}`)
    super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height)
  }
}