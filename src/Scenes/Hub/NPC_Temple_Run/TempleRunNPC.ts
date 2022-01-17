import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
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
    super(xpos, ypos, './assets/img/Temple-Run/opa.png', width, height, 'templerun', 'left', 'Grot Plotter')
    this.userData = userData
    this.cutScene = new TempleRunNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    const originalData = this.userData.getNPCStoryProgress('templerun')
    if (this.userData.getNPCStoryProgress('doodle').finished) {
      this.userData.changeNPCStoryProgress({name: 'templerun', talkedTo: true, finished: originalData.finished })
    }
    return this.cutScene
  }

  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress('doodle').finished === true) this.teleporter.activate()
  }
}