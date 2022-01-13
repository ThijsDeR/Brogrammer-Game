
import CutScene from '../../CutScene.js';
import UserData from '../../UserData.js';
import HubNPC from '../Hub/HubNPC.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';

export default class MainNPC extends HubNPC {
  private cutScene: TutorialNPCCutscene;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/sephiroth.png', width, height, 'controls', 'left', 'Tutorial')

    this.cutScene = new TutorialNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }
}