import GameSceneHandler from './GameSceneHandler.js';
import UserData from './UserData.js';

export default class Game {

  private sceneHandler: GameSceneHandler;

  private canvas: HTMLCanvasElement;

  private userData: UserData;

  /**
   * l
   *
   * @param canvas l
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.userData = new UserData();
    this.sceneHandler = new GameSceneHandler(this);
  }

  /**
   * Getter for the UserData
   *
   * @returns UserData
   */
  public getUserData(): UserData {
    return this.userData;
  }

  /**
   * Method that starts the game.
   */
  public start(): void {
    this.sceneHandler.start();
  }

  /**
   * l
   *
   * @returns The canvas
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
