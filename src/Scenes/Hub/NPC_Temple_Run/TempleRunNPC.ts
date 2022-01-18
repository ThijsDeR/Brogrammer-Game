import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import DoodleInfo from '../../Doodle/Info/DoodleInfo.js';
import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';

export default class TempleRunNPC extends HubNPC {
  private cutScene: TempleRunNPCCutscene;

  private userData: UserData;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, GameInfo.IMG_PATH + 'Temple-Run/opa.png', width, height, 'templerun', 'left', 'Grot Plotter')
    this.userData = userData
    this.cutScene = new TempleRunNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {  
    return this.cutScene
  }

  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress(DoodleInfo.DOODLE_PROGRESS_OBJECT_NAME).finished === true) this.teleporter.activate()
  }
}