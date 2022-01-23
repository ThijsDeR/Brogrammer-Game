import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import UserData from '../../../UserData.js';
import HubNPC from '../HubNPC.js';
import DoodleNPCCutscene from './DoodleNPCCutscene.js';

export default class DoodleNPC extends HubNPC {
  private cutScene: DoodleNPCCutscene;

  private userData: UserData;

  /**
   * Initialize DoodleNPC
   *
   * @param xpos xpos
   * @param ypos ypos
   * @param width width
   * @param height height
   * @param canvas the game canvas
   * @param userData user data
   */
  public constructor(
    xpos: number,
    ypos: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,

  ) {
    super(xpos, ypos, `${GameInfo.IMG_PATH}dad.png`, width, height, 'doodle', 'right', 'Wolkentrap');
    this.userData = userData;
    this.cutScene = new DoodleNPCCutscene(canvas, userData, this);
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
    this.teleporter.activate();
    this.talkingDelay = 1000;
  }
}
