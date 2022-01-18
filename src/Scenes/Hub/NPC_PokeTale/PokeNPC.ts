import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
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
    super(xpos, ypos, GameInfo.IMG_PATH + 'Ash.png', width, height, 'poketale','right', 'Poketale')
    this.userData = userData
    this.cutScene = new PokeNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished === true) this.teleporter.activate()
  }
}