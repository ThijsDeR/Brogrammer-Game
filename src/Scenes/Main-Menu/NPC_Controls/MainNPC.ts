
import CutScene from '../../../CutScene.js';
import NPC from '../../../Props/NPC.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import TutorialNPCCutscene from './TutorialNPCCutScene.js';

export default class MainNPC extends NPC {
  private cutScene: TutorialNPCCutscene;

  protected name: string;
  public constructor(
    xpos: number, 
    ypos: number,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    canvas: HTMLCanvasElement,
    userData: UserData,
    
  ) {
    super(xpos, ypos, './assets/img/sephiroth.png', width, height)

    this.cutScene = new TutorialNPCCutscene(canvas, userData, this)
    this.name = 'Tutorial'
  }

  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx, offsetX, offsetY)
    Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, this.height / 4, 'white')
  }

  public interact(): CutScene {
    return this.cutScene
  }
}