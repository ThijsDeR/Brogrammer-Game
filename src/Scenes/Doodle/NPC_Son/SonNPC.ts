import CutScene from '../../../CutScene.js';
import GameInfo from '../../../GameInfo.js';
import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import SonNPCCutscene from './SonNPCCutscene.js';

export default class SonNPC extends NPC {
  private cutScene: SonNPCCutscene;

  protected name: string;

  /**
   * Initialize SonNPC
   *
   * @param xpos xpos
   * @param ypos ypos
   * @param width width
   * @param height height
   * @param canvas canvas
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
    super(xpos, ypos, `${GameInfo.IMG_PATH}son.png`, width, height);

    this.cutScene = new SonNPCCutscene(canvas, userData, this);
    this.name = 'Son';
  }

  /**
   * draw the son npc to the canvas
   *
   * @param ctx the canvas rendering context
   * @param offsetX offsetx
   * @param offsetY offsety
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx, offsetX, offsetY);
    Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2) - offsetX, this.yPos - 20 - offsetY, this.height / 4, 'white');
  }

  /**
   * interact function
   *
   * @returns the cutscene of the npc
   */
  public interact(): CutScene {
    return this.cutScene;
  }

  /**
   * Function that is called after the interaction is finished
   */
  // eslint-disable-next-line class-methods-use-this
  public finishInteraction(): void {

  }
}
