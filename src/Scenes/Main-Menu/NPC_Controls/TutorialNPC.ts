import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';

export default class TutorialNPC extends NPC {
  private cutScene: TutorialNPCCutscene;

  protected name: string;

  /**
   * Initialize TutorialNPC
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
    super(xpos, ypos, `${GameInfo.IMG_PATH}sephiroth.png`, width, height);

    this.cutScene = new TutorialNPCCutscene(canvas, userData, this);
    this.name = 'Instructie';
  }

  /**
   * draw the tutorial npc
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY offsety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx, offsetX, offsetY);
    Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, this.height / 4, 'white');
  }

  /**
   * interaction function
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
    this.talkingDelay = 1000;
  }
}
