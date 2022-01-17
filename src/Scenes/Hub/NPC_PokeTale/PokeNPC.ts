import CutScene from '../../../CutScene.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';

export default class PokeNPC extends HubNPC {
  private cutScene: PokeNPCCutscene;

  private userData: UserData;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/Ash.png', width, height, 'poketale','right', 'Poketale')
    this.userData = userData
    this.cutScene = new PokeNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    const originalData = this.userData.getNPCStoryProgress('poke')
    if (this.userData.getNPCStoryProgress('templerun').finished) {
      this.userData.changeNPCStoryProgress({name: 'poke', talkedTo: true, finished: originalData.finished })
    }
    return this.cutScene
  }

  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress('templerun').finished === true) this.teleporter.activate()
  }
}