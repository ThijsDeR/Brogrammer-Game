import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import DoodleInfo from '../../Doodle/Info/DoodleInfo.js';
import HubNPC from '../HubNPC.js';
import TempleRunNPCCutscene from './TempleRunNPCCutscene.js';

export default class TempleRunNPC extends HubNPC {
  private cutScene: TempleRunNPCCutscene;

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
    super(xpos, ypos, `${GameInfo.IMG_PATH}Temple-Run/Opa.png`, width, height, 'templerun', 'left', 'Grot Plotter');
    this.userData = userData;
    this.cutScene = new TempleRunNPCCutscene(canvas, userData, this);
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
    if (this.userData.getNPCStoryProgress(DoodleInfo.DOODLE_PROGRESS_OBJECT_NAME).finished === true) this.teleporter.activate();
    this.talkingDelay = 1000;
  }
}
