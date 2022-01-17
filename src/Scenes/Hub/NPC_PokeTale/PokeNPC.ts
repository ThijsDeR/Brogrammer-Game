import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';

export default class PokeNPC extends HubNPC {
  private cutScene: PokeNPCCutscene;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/Verkoper.png', width, height, 'poketale','right', 'Telefonie')

    this.cutScene = new PokeNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    this.teleporter.activate()
  }
}