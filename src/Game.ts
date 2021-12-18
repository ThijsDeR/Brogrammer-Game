import GameSceneHandler from './GameSceneHandler.js';

export default class Game {
  public static readonly PLAYER_Y_SPEED: number = 12;


  private sceneHandler: GameSceneHandler;

  private canvas: HTMLCanvasElement;

  /**
   * l
   *
   * @param canvas l
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.sceneHandler = new GameSceneHandler(this);
  }

  /**
   * l
   */
  public start(): void {
    this.sceneHandler.start();
  }

  /**
   * l
   *
   * @returns l
   */
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * l
   *
   * @param src l
   * @returns l
   */
  public static loadNewImage(
    src: string, 
    width: number | undefined = undefined, 
    height: number | undefined = undefined
  ): HTMLImageElement {
    const img = new Image();
    img.src = src;
    if (width) img.width = width
    if (height) img.height = height
    return img;
  }
}
