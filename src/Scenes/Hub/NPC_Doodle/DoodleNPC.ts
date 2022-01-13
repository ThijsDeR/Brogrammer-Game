import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';

export default class DoodleNPC extends HubNPC {
  private cutScene: DoodleNPCCutscene;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/dad.png', width, height, 'doodle','right', 'Cloud jump')

    this.cutScene = new DoodleNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    this.teleporter.activate()
  }
}