import KeyboardListener from '../../KeyboardListener.js';
import Player from '../../Player.js';
import Prop from '../../Props/Prop.js';

export default class HubPlayer extends Player {

  private props: Prop[];
  
  public constructor(
    xPos: number, 
    yPos: number, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ) {
    super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height)
  }

  public isInteracting(): boolean {
    return this.keyboardListener.isKeyDown(KeyboardListener.KEY_E)
  }
}