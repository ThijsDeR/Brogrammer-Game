import CutScene from '../../../CutScene.js';
import NPC from '../../../Props/NPC.js';
import UserData from '../../../UserData.js';
import SonNPCCutscene from './SonNPCCutscene.js';


export default class SonNPC extends NPC {
  private cutScene: SonNPCCutscene;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/son.png', width, height)

    this.cutScene = new SonNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    
  }
}