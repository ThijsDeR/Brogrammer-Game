import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
import HubNPC from '../HubNPC.js';
import PokeNPCCutscene from './PokeNPCCutscene.js';

export default class PokeNPC extends HubNPC {
  private cutScene: PokeNPCCutscene;

  private userData: UserData;

  /**
   * @param xpos
   * @param ypos
   * @param width
   * @param height
   * @param canvas
   * @param userData
   */
  public constructor(
    xpos: number,
    ypos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,

  ) {
    super(xpos, ypos, `${GameInfo.IMG_PATH}Ash.png`, width, height, 'poketale', 'right', 'Poketale');
    this.userData = userData;
    this.cutScene = new PokeNPCCutscene(canvas, userData, this);
  }

  /**
   *
   */
  public interact(): CutScene | null {
    if (this.talkingDelay < 0) return this.cutScene;
    return null;
  }

  /**
   *
   */
  public finishInteraction(): void {
    if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished === true) this.teleporter.activate();
    this.talkingDelay = 1000;
  }
}
