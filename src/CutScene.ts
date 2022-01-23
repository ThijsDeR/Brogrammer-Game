import KeyboardListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserData from './UserData.js';

export default abstract class CutScene {
  protected keyboardListener: KeyboardListener;

  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;

  protected userData: UserData;

  /**
   * Constructor of CutScene
   *
   * @param canvas The game canvas
   * @param userData The data of the user
   */
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.userData = userData;

    this.keyboardListener = new KeyboardListener();
  }

  /**
   * drawing the scene
   */
  public abstract draw(): void;

  /**
   * processing the input of the scene
   */
  public abstract processInput(): void;

  /**
   * update the scene
   */
  public abstract update(elapsed: number): boolean;

  /**
   * Getter for optional scenes
   */
  public abstract getOptionalScene(): Scene | null;
}
