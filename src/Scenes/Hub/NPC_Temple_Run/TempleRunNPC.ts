import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';

export default class TempleRunNPC extends HubNPC {
  private cutScene: TempleRunNPCCutscene;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/old_man.png', width, height, 'templerun', 'left', 'Cave escape')

    this.cutScene = new TempleRunNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    this.teleporter.activate()
  }
}