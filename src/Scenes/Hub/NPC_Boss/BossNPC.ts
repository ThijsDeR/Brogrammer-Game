import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import HubNPC from '../HubNPC.js';
import BossNPCCutscene from './BossNPCCutscene.js';

export default class BossNPC extends HubNPC {
  private cutScene: BossNPCCutscene;

  private userData: UserData;

  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, GameInfo.IMG_PATH + 'sephiroth.png', width, height, 'boss','right', 'EindBaas')
    this.userData = userData
    this.cutScene = new BossNPCCutscene(canvas, userData, this)
  }

  public interact(): CutScene {
    return this.cutScene
  }

  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).finished === true) this.teleporter.activate()
  }
}