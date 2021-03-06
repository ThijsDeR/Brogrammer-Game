import GameSceneHandler from './GameSceneHandler.js';
import UserData from './UserData.js';

export default class Game {
  private sceneHandler: GameSceneHandler;

  private canvas: HTMLCanvasElement;

  private userData: UserData;

  /**
   * The constructor of Game
   *
   * @param canvas the playing field
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
   * Method that returns the canvas
   *
   * @returns The canvas
   */
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * Method that loads a new image
   *
   * @param src Source of the image
   * @param width Width of the image
   * @param height Height of the image
   * @returns The new image
   */
  public static loadNewImage(
    src: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ): HTMLImageElement {
    const img = new Image();
    img.src = src;
    if (width) img.width = width;
    if (height) img.height = height;
    return img;
  }

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
