import CollideHandler from './CollideHandler.js';
import Player from './Player.js';
import Prop from './Prop.js';
import UserData from './UserData.js';

export default abstract class Scene {
  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;
  
  protected userData: UserData
  /**
   * l
   *
   * @param canvas l
   */
  public constructor(canvas: HTMLCanvasElement, userData: UserData) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.userData = userData

   

    
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
   *
   */
  public abstract update(elapsed: number): Scene;
}
