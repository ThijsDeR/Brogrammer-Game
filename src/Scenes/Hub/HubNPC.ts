import CutScene from '../../CutScene.js';
import NPC from '../../Props/NPC.js';
import Teleporter from '../../Props/Teleporter.js';
import Scene from '../../Scene.js';

export default abstract class HubNPC extends NPC {
  protected scene: CutScene;

  protected teleporter: Teleporter;

  protected name: string;

  /**
   * @param xPos
   * @param yPos
   * @param imageSrc
   * @param width
   * @param height
   * @param teleporter
   * @param direction
   * @param name
   */
  public constructor(
    xPos: number,
    yPos: number,
    imageSrc: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    teleporter: string,
    direction: 'left' | 'right',
    name: string,
  ) {
    super(xPos, yPos, imageSrc, width, height);

    let teleporterxPos;
    if (direction === 'right') teleporterxPos = xPos + (width * 1.5);
    else if (direction === 'left') teleporterxPos = xPos - (width * 2) - (width * 0.5);
    this.teleporter = new Teleporter(teleporterxPos, yPos - height, width * 2, height * 2, teleporter);
    this.name = name;
  }

  /**
   * @param ctx
   * @param offsetX
   * @param offsetY
   */
  public draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void {
    super.draw(ctx, offsetX, offsetY);
    this.teleporter.draw(ctx, offsetX, offsetY);
    Scene.writeTextToCanvas(ctx, this.name, this.xPos + (this.width / 2), this.yPos - 20, this.height / 4, 'white');
  }

  public abstract interact(): CutScene;

  /**
   *
   */
  public getTeleporter(): Teleporter {
    return this.teleporter;
  }
}
