import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';

export default class DoodleNPC extends HubNPC {
  private cutScene: DoodleNPCCutscene;

  private userData: UserData;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/dad.png', width, height, 'doodle','right', 'Wolkentrap')
    this.userData = userData;
    this.cutScene = new DoodleNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    const originalData = this.userData.getNPCStoryProgress('doodle')
    this.userData.changeNPCStoryProgress({name: 'doodle', talkedTo: true, finished: originalData.finished })
    return this.cutScene
  }

  public finishInteraction(): void {
    this.teleporter.activate()
  }
}