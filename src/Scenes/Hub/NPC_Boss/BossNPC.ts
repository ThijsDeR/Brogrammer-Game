import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import HubNPC from '../HubNPC.js';
import BossNPCCutscene from './BossNPCCutscene.js';

export default class BossNPC extends HubNPC {
  private cutScene: BossNPCCutscene;

  private userData: UserData;

  /**
   * Initialize BossNPC
   *
   * @param xpos xpos
   * @param ypos ypos
   * @param width width
   * @param height height
   * @param canvas canvas
   * @param userData userdata
   */
  public constructor(
    xpos: number,
    ypos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,

  ) {
    super(xpos, ypos, `${GameInfo.IMG_PATH}sephiroth.png`, width, height, 'boss', 'right', 'EindBaas');
    this.userData = userData;
    this.cutScene = new BossNPCCutscene(canvas, userData, this);
  }

  /**
   * interact function
   *
   * @returns cutscene
   */
  public interact(): CutScene | null {
    if (this.talkingDelay < 0) return this.cutScene;
    return null;
  }

  /**
   *
   */
  public finishInteraction(): void {
    if (
      this.userData.getNPCStoryProgress(
        PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME,
      ).finished === true) this.teleporter.activate();
    this.talkingDelay = 1000;
  }
}
