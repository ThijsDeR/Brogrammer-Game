import CutScene from '../../CutScene.js';
import NPC from '../../Props/NPC.js';
import Teleporter from '../../Props/Teleporter.js';

export default abstract class HubNPC extends NPC {
  protected scene: CutScene

  protected teleporter: Teleporter;

  public constructor(
    xPos: number, 
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined, 
    height: number | undefined = undefined,
    teleporter: string,
    direction: 'left' | 'right'
    ) {
      super(xPos, yPos, imageSrc, width, height)

      let rocketxPos;
      if (direction === 'right') rocketxPos = xPos + (width * 1.5);
      else if (direction === 'left') rocketxPos = xPos - (width * 2) - (width * 0.5)
      this.teleporter = new Teleporter(rocketxPos, yPos - height, width * 2, height * 2, teleporter)
  } 

  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx, offsetX, offsetY)
    this.teleporter.draw(ctx, offsetX, offsetY)
  }

  public abstract interact(): CutScene;

  public getTeleporter(): Teleporter {
    return this.teleporter;
  }
}